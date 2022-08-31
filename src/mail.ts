import * as nodemailer from 'nodemailer'
import Mail = require('nodemailer/lib/mailer')
import { HttpException } from '@/exceptions/http-exception'
import { HttpStatus } from './constants/http-status'
import { Env } from '@/env'

interface MailMeta {
    transporter: Mail
    from: string
}

interface MailResult {
    accepted: string[]
    rejected: string[]
    envelopeTime: number
    messageTime: number
    messageSize: number
    response: string
    envelope: {
        from: string
        to: string[]
    }
    messageId: string
}

let mailTransporter: MailMeta['transporter'] | undefined = undefined

export async function initMail(): Promise<boolean> {
    try {
        const host = Env.MAIL_HOST
        if (!host) return false
        const port = Env.MAIL_PORT
        if (!port) return false
        const user = Env.MAIL_USER
        if (!user) return false
        const pass = Env.MAIL_PASSWORD
        if (!pass) return false
        const transporter = nodemailer.createTransport({
            host,
            port,
            auth: {
                user,
                pass,
            },
            logger: Env.isDevelopment,
            secure: true,
            requireTLS: false,
        })
        // verify connection configuration and throw an error if it fails
        await transporter.verify()
        mailTransporter = transporter as MailMeta['transporter']
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function sendMail(mailOptions: Mail.Options): Promise<MailResult> {
    if (mailTransporter !== undefined) {
        if (mailOptions.from === undefined) mailOptions.from = Env.MAIL_USER
        const result = await mailTransporter.sendMail(mailOptions)
        console.log('sendMail result', result)
        return result
    }
    throw new HttpException(HttpStatus.InternalServerError, `Email has not been initialized.`)
}
