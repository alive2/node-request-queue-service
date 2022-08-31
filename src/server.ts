import 'dotenv/config'
import 'colors'
import '@/env'
import App from '@/app'
import IndexRoute from '@/routes/index.route'
import RequestQueueRoute from '@/routes/request-queue.route'
import ProxyRoute from '@/routes/proxy.route'
import { initMail } from '@/mail'
import { dbConnection } from '@/databases'
import { createConnection } from 'typeorm'
import { logger } from './utils/logger'

async function main() {
    logger.info('Initializing database...'.yellow)
    await createConnection(dbConnection)
    logger.info('Initializing mail...'.yellow)
    await initMail()

    const app = new App([new IndexRoute(), new RequestQueueRoute(), new ProxyRoute()])
    app.listen()
}
main()
