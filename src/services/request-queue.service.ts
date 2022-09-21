import { EntityRepository, Repository } from 'typeorm'
import { CreateRequestDto } from '@/dtos/request-queue.dto'
import { RequestEntity } from '@/entities/request-queue.entity'
import { HttpException } from '@/exceptions/http-exception'
import { IRequest } from '@/interfaces/request-queue.interface'
import { isEmpty } from '@/utils/util'
import { HttpStatus } from '@/constants/http-status'
import fetch, { Request } from 'node-fetch'
import { AbortController } from 'node-abort-controller'
import { Env } from '@/env'

@EntityRepository()
class _RequestQueueService extends Repository<RequestEntity> {
    public async processRequest(requestQueue: { url: string; data?: Request }, timeout = Env.REQUEST_TIMEOUT) {
        const controller = new AbortController()
        const signal = controller.signal as any
        setTimeout(() => controller.abort(), timeout)
        return await fetch(requestQueue.url, { ...requestQueue.data, signal })
    }

    public async findAllRequests(): Promise<IRequest[]> {
        const requestQueues: IRequest[] = await RequestEntity.find()
        return requestQueues
    }

    public async findRequestById(requestQueueId: number): Promise<IRequest> {
        if (isEmpty(requestQueueId)) throw new HttpException(HttpStatus.BadRequest, 'RequestQueueId is empty')

        const findRequestQueue: IRequest = await RequestEntity.findOne({ where: { id: requestQueueId } })
        if (!findRequestQueue) throw new HttpException(HttpStatus.Conflict, "RequestQueue doesn't exist")

        return findRequestQueue
    }

    public async createRequest(requestQueueData: CreateRequestDto): Promise<IRequest> {
        if (isEmpty(requestQueueData)) throw new HttpException(HttpStatus.BadRequest, 'requestQueueData is empty')
        return await RequestEntity.create(requestQueueData).save()
    }

    public async updateRequest(requestQueueId: number, requestQueueData: CreateRequestDto): Promise<IRequest> {
        if (isEmpty(requestQueueData)) throw new HttpException(HttpStatus.BadRequest, 'requestQueueData is empty')

        const findRequestQueue: IRequest = await RequestEntity.findOne({ where: { id: requestQueueId } })
        if (!findRequestQueue) throw new HttpException(HttpStatus.Conflict, "RequestQueue doesn't exist")

        await RequestEntity.update(requestQueueId, requestQueueData)

        const updateRequestQueue: IRequest = await RequestEntity.findOne({ where: { id: requestQueueId } })
        return updateRequestQueue
    }

    public async deleteRequest(requestQueueId: number): Promise<IRequest> {
        if (isEmpty(requestQueueId)) throw new HttpException(HttpStatus.BadRequest, 'RequestQueueId is empty')

        const findRequestQueue: IRequest = await RequestEntity.findOne({ where: { id: requestQueueId } })
        if (!findRequestQueue) throw new HttpException(HttpStatus.Conflict, "RequestQueue doesn't exist")

        await RequestEntity.delete({ id: requestQueueId })
        return findRequestQueue
    }
}

export const RequestQueueService = new _RequestQueueService()
