import { Router } from 'express'
import RequestQueueController from '@/controllers/request-queue.controller'
import { CreateRequestDto } from '@/dtos/request-queue.dto'
import { Routes } from '@/interfaces/routes.interface'
import validationMiddleware from '@/middlewares/validation.middleware'

class RequestQueueRoute implements Routes {
    public path = '/request-queue'
    public router = Router()
    public requestQueueController = new RequestQueueController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.requestQueueController.getRequest)
        this.router.get(`${this.path}/:id(\\d+)`, this.requestQueueController.getRequestById)
        this.router.post(`${this.path}`, validationMiddleware(CreateRequestDto, 'body'), this.requestQueueController.createRequest)
        this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateRequestDto, 'body', true), this.requestQueueController.updateRequest)
        this.router.delete(`${this.path}/:id(\\d+)`, this.requestQueueController.deleteRequest)
    }
}

export default RequestQueueRoute
