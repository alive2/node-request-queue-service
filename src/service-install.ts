import 'dotenv/config'
import { Env } from '@/env'
import * as path from 'path'

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
