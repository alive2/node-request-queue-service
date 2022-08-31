import { NextFunction, Request, Response } from 'express'
import { CreateRequestDto } from '@/dtos/request-queue.dto'
import { IRequest } from '@/interfaces/request-queue.interface'
import { RequestQueueService } from '@/services/request-queue.service'
import { HttpStatus } from '@/constants/http-status'

class RequestQueueController {
    public getRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllRequestData: IRequest[] = await RequestQueueService.findAllRequests()

            res.status(HttpStatus.Ok).json({ data: findAllRequestData, message: 'findAll' })
        } catch (error) {
            next(error)
        }
    }

    public getRequestById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const requestd = Number(req.params.id)
            const findOneRequestData: IRequest = await RequestQueueService.findRequestById(requestd)

            res.status(HttpStatus.Ok).json({ data: findOneRequestData, message: 'findOne' })
        } catch (error) {
            next(error)
        }
    }

    public createRequest = async (req: Request, res: Response): Promise<void> => {
        const requestData: CreateRequestDto = req.body
        try {
            await RequestQueueService.processRequest(requestData as IRequest, 5000)
            res.status(HttpStatus.Ok).json({ data: 'PROCESSED', message: 'created' })
        } catch (error) {
            await RequestQueueService.createRequest(requestData)
            res.status(HttpStatus.Ok).json({ data: 'QUEUED', message: 'created' })
        }
    }

    public updateRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const requestd = Number(req.params.id)
            const requestData: CreateRequestDto = req.body
            const updateRequestData: IRequest = await RequestQueueService.updateRequest(requestd, requestData)

            res.status(HttpStatus.Ok).json({ data: updateRequestData, message: 'updated' })
        } catch (error) {
            next(error)
        }
    }

    public deleteRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const requestd = Number(req.params.id)
            const deleteRequestData: IRequest = await RequestQueueService.deleteRequest(requestd)

            res.status(HttpStatus.Ok).json({ data: deleteRequestData, message: 'deleted' })
        } catch (error) {
            next(error)
        }
    }
}

export default RequestQueueController
