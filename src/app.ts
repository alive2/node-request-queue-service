import 'reflect-metadata'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import morgan from 'morgan'
import compression from 'compression'
import { Routes } from '@/interfaces/routes.interface'
import errorMiddleware from '@/middlewares/error.middleware'
import { logger, stream } from '@/utils/logger'
import { Env } from './env'
import { RequestQueueScheduler } from '@/request-queue-scheduler'

class App {
    public app: express.Application
    public env: string
    public port: number

    constructor(routes: Routes[]) {
        this.app = express()
        this.env = Env.NODE_ENV || 'development'
        this.port = Env.PORT || 3000

        this.initializeRoutes(routes, true)
        this.initializeMiddlewares()
        this.initializeRoutes(routes, false)
        this.initializeErrorHandling()

        new RequestQueueScheduler()
    }

    public listen() {
        const callback = () => {
            logger.info(`[${this.env.toUpperCase()}] App listening on the port ${this.port}`.green)
        }
        if (Env.isProduction) {
            this.app.listen(this.port, 'localhost', callback)
        } else {
            this.app.listen(this.port, callback)
        }
    }

    public getServer() {
        return this.app
    }

    private initializeMiddlewares() {
        this.app.use(morgan(Env.LOG_FORMAT, { stream }))
        this.app.use(cors({ origin: Env.ORIGIN, credentials: Env.CREDENTIALS }))
        this.app.use(hpp())
        this.app.use(helmet())
        this.app.use(compression())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cookieParser())
    }

    private initializeRoutes(routes: Routes[], beforeMiddlewares: boolean) {
        if (beforeMiddlewares) {
            routes
                .filter(route => route.initBeforeMiddlewares)
                .forEach(route => {
                    this.app.use('/', route.router)
                })
        } else {
            routes
                .filter(route => !route.initBeforeMiddlewares)
                .forEach(route => {
                    this.app.use('/', route.router)
                })
        }
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware)
    }
}

export default App
