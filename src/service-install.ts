import 'dotenv/config'
import * as path from 'path'
import { Env } from './env'

const Service = require('node-linux').Service

const svc = new Service({
    name: Env.SERVICE_NAME,
    description: 'HTTP Request Queue',
    script: path.join(__dirname, 'server.js'),
})

svc.on('install', function () {
    svc.start()
})

svc.install()
