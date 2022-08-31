import { CronJob } from 'cron'
import { logger } from '@/utils/logger'
import { Env } from '@/env'
import { RequestQueueService } from '@/services/request-queue.service'
import { sendMail } from './mail'

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
                await RequestQueueService.deleteRequest(request.id)
            } catch (err) {
                console.log(`Failed to process request ${request.id}`, JSON.stringify(err, null, 4).red)
                if (typeof err === 'object' && err.type === 'aborted') {
                    console.error(`Request ${request.id} timed out after ${Env.REQUEST_TIMEOUT} milliseconds`)
                    request.attempts++
                    await RequestQueueService.updateRequest(request.id, request)
                    if (request.attempts >= Env.REQUEST_MAX_ATTEMPTS_ON_TIMEOUT) {
                        console.error(`Request ${request.id} exceeded maximum attempts (${Env.REQUEST_MAX_ATTEMPTS_ON_TIMEOUT}) and will be removed`)
                        await RequestQueueService.deleteRequest(request.id)
                        try {
                            await sendMail({
                                to: Env.MAIL_RECEIVER,
                                subject: 'Request Queue Scheduler',
                                text: [
                                    `Failed to process request ${Env.REQUEST_MAX_ATTEMPTS_ON_TIMEOUT} times.`,
                                    'Request info:',
                                    `Request ID: ${request.id}`,
                                    `Request URL: ${request.url}`,
                                    `Request DATA: ${JSON.stringify(request.data, null, 4)}`,
                                ].join('\n'),
                            })
                        } catch (error) {
                            console.error(error)
                        }
                    }
                } else {
                    logger.error(err)
                    await RequestQueueService.deleteRequest(request.id)
                }
            }
        }
    }
}
