import { RequestHandler } from 'express'
import type { Proxy2Dto } from '@/dtos/proxy2.dto'
import { RequestQueueService } from '@/services/request-queue.service'
import { logger } from '@/utils/logger'

class Proxy2Controller {
    public fetchProxy: RequestHandler<{}, {}, Proxy2Dto> = async (req, res, next) => {
        console.log('fetchProxy', req.body)
        try {
            const response = await RequestQueueService.processRequest({
                url: req.body.url,
                data: req.body.data,
            })

            res.setHeader('content-type', response.headers.get('content-type'))

            res.status(response.status).send(await response.buffer())
        } catch (error) {
            console.log('[Proxy2] Error', JSON.stringify(error, null, 4).red)
            if (req.body.queueOnTimeout && ((typeof error === 'object' && error.type === 'aborted') || (error as any).code === 'ECONNREFUSED')) {
                await RequestQueueService.createRequest(req.body)
                    .then(() => {
                        logger.error(`[Proxy2] Request timed out. Request queued.`)
                    })
                    .catch(() => {
                        logger.error('[Proxy2] Failed to create request in queue')
                    })
                res.status(499).json({ message: 'Request failed to process and is added to the queue' })
                return
            }

            next(error)
        }
    }
}

export default Proxy2Controller
