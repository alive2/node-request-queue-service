import 'dotenv/config'
import 'colors'
import '@/env'
import App from '@/app'
import { initMail } from '@/mail'
import { dbConnection } from '@/databases'
import { createConnection } from 'typeorm'
import { logger } from './utils/logger'

import IndexRoute from '@/routes/index.route'
import RequestQueueRoute from '@/routes/request-queue.route'
import ProxyRoute from '@/routes/proxy.route'
import Sms019Route from '@/routes/sms019.route'

async function main() {
    logger.info('Initializing database...'.yellow)
    await createConnection(dbConnection)
    logger.info('Initializing mail...'.yellow)
    await initMail()

    const app = new App([new IndexRoute(), new RequestQueueRoute(), new ProxyRoute(), new Sms019Route()])
    app.listen()
}
main()
