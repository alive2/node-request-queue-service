import { CronJob } from 'cron'
import { logger } from '@/utils/logger'
import { Env } from '@/env'
import { RequestQueueService } from '@/services/request-queue.service'

export class RequestQueueScheduler {
    job: CronJob

    constructor() {
        this.job = new CronJob(Env.REQUEST_SCHEDULER_CRON, this.safeRun.bind(this), null, true, Env.TIMEZONE, RequestQueueScheduler.name, false)
    }

    private async safeRun() {
        try {
            await this.run()
        } catch (error) {
            logger.error(error)
        }
    }

    private async run() {
        logger.info('Running RequestQueueScheduler...')

        const requestQueue = await RequestQueueService.findAllRequests()
        logger.info(`Found ${requestQueue.length} requests`)

        for (const request of requestQueue) {
            logger.info(`Processing request ${request.id}`)
            try {
                const response = await RequestQueueService.processRequest(request)
                console.log('Response', JSON.stringify(response, null, 4).cyan)
            } catch (err) {
                console.log(`Failed to process request ${request.id}`, JSON.stringify(err, null, 4).red)
                if (typeof err === 'object' && err.type === 'aborted') {
                    console.error(`Request ${request.id} timed out after ${Env.REQUEST_TIMEOUT} milliseconds`)
                } else {
                    logger.error(err)
                    await RequestQueueService.deleteRequest(request.id)
                }
            }
        }
    }
}
