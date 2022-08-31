import 'dotenv/config'
import 'colors'
import '@/env'
import App from '@/app'
import IndexRoute from '@/routes/index.route'
import RequestQueueRoute from '@/routes/request-queue.route'
import ProxyRoute from '@/routes/proxy.route'

const app = new App([new IndexRoute(), new RequestQueueRoute(), new ProxyRoute()])

app.listen()
