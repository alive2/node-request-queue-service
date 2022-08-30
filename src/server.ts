import 'dotenv/config'
import 'colors'
import '@/env'
import App from '@/app'
import IndexRoute from '@/routes/index.route'
import RequestQueueRoute from '@/routes/request-queue.route'

const app = new App([new IndexRoute(), new RequestQueueRoute()])

app.listen()
