import 'dotenv/config'
import { Env } from '@/env'
import * as path from 'path'

const Service = require('node-linux').Service

const svc = new Service({
    name: Env.SERVICE_NAME,
    script: path.join(__dirname, 'server.js'),
})

svc.on('uninstall', function () {
    console.log('Uninstall complete.')
    console.log('The service exists: ', svc.exists())
})

svc.uninstall()
