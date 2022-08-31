import { Router } from 'express'
import { Routes } from '@/interfaces/routes.interface'
import * as corsAnywhere from 'cors-anywhere'

class ProxyRoute implements Routes {
    public path = '/proxy'
    public router = Router()
    public initBeforeMiddlewares = true

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        const proxy = corsAnywhere.createServer({
            originWhitelist: [],
            requireHeader: [],
            removeHeaders: [],
            // removeHeaders: ['cookie', 'cookie2'],
        })
        this.router.all(
            `${this.path}/:proxyUrl*`,
            // isLoggedInMiddleware,
            (req, res) => {
                req.url = req.url.replace(`${this.path}/`, '/')
                proxy.emit('request', req, res)
            },
        )
    }
}

export default ProxyRoute
