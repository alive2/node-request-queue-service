import { Router } from 'express'
import SmsController from '@/controllers/sms019.controller'
import { Routes } from '@/interfaces/routes.interface'
import validationMiddleware from '@/middlewares/validation.middleware'
import { SendSmsDto } from '@/dtos/sms019.dto'

class SmsRoute implements Routes {
    public path = '/sms'
    public router = Router()
    public sms019Controller = new SmsController()
    public initBeforeMiddlewares = false

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/send`, validationMiddleware(SendSmsDto), this.sms019Controller.sendSms)
    }
}

export default SmsRoute
