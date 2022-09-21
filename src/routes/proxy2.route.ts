import { Router } from 'express'
import Proxy2Controller from '@/controllers/proxy2.controller'
import { Routes } from '@/interfaces/routes.interface'
import validationMiddleware from '@/middlewares/validation.middleware'
import { Proxy2Dto } from '@/dtos/proxy2.dto'

class Proxy2Route implements Routes {
    public path = '/proxy2'
    public router = Router()
    public controller = new Proxy2Controller()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(this.path, validationMiddleware(Proxy2Dto), this.controller.fetchProxy)
    }
}

export default Proxy2Route
