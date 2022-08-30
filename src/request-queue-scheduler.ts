import { CronJob } from 'cron'
import { logger } from '@/utils/logger'
import { Env } from '@/env'
import { RequestQueueService } from '@/services/request-queue.service'
import { HttpStatus } from './constants/http-status'

export class RequestQueueScheduler {
    job: CronJob

    constructor() {
        this.job = new CronJob(
            '*/10 * * * * *', // At every 10 seconds
            this.safeRun.bind(this),
            null,
            true,
            Env.TIMEZONE,
            RequestQueueScheduler.name,
            false,
        )
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
                const result = await RequestQueueService.processRequest(request)
                if (result.status !== HttpStatus.RequestTimeout) {
                    logger.info(`Request ${request.id} processed`)
                    await RequestQueueService.deleteRequest(request.id)
                } else {
                    logger.info(`Request ${request.id} timed out`)
                }
            } catch (err) {
                logger.error(err)
                await RequestQueueService.deleteRequest(request.id)
            }
        }
    }
}
