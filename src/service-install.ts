import 'dotenv/config'
import * as path from 'path'

const Service = require('node-linux').Service

const svc = new Service({
    name: 'RequestQueue',
    description: 'HTTP Request Queue',
    script: path.join(__dirname, 'server.js'),
    env: [
        {
            name: 'NODE_ENV',
            value: 'production',
        },
    ],
})

svc.on('install', function () {
    svc.start()
})

svc.install()
