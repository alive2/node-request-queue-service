import * as builder from 'xmlbuilder'
import * as convert from 'xml-js'
import fetch from 'node-fetch'
import { HttpStatus } from '@/constants/http-status'
import { HttpException } from '@/exceptions/http-exception'
import { v4 as uuidv4 } from 'uuid'
import { ResponseCode } from '@/constants/sms019'
import { Env } from '@/env'
import { SendSmsDto } from './dtos/sms019.dto'

const USE_SANDBOX = false
const API_URL = USE_SANDBOX ? Env.SMS019_API_SANDBOX_HOST : Env.SMS019_API_HOST
const API_USERNAME = Env.SMS019_API_USERNAME
const API_PASSWORD = Env.SMS019_API_PASSWORD

/**
 * The Ministry of Communications prohibits sending SMS messages from an automated mailing system without verifying the sending number.
 * Therefore, we want our source to consist of alphanumeric chars only (max length: 11).
 */
export const SMS_SOURCE_REGEXP = /^([a-zA-Z]){1,11}$/
const NON_DIGIT_REGEXP = /\D/g

type SmsRequestData = {
    sms: {
        user: {
            username: string
            password: string
        }
        source: string
        destinations: {
            phone: Array<{ '@id': number; '#text': string }>
        }
        message: string
    }
}

type SmsResponseData = {
    status: ResponseCode
    message: string
    shipment_id: number
}

export async function sendSms({ source, phone, message }: SendSmsDto): Promise<SmsResponseData> {
    if (!SMS_SOURCE_REGEXP.test(source)) throw new HttpException(HttpStatus.BadRequest, 'Invalid source format')

    if (!(phone instanceof Array)) phone = [phone]

    const _phone = phone.map(number => ({
        '@id': uuidv4(),
        '#text': number.replace(NON_DIGIT_REGEXP, ''),
    }))

    const requestData: SmsRequestData = {
        sms: {
            user: { username: API_USERNAME, password: API_PASSWORD },
            source,
            destinations: { phone: _phone },
            message,
        },
    }

    const requestXmlData = builder.create(requestData, { encoding: 'UTF-8' }).end({ pretty: true })

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/xml; charset=utf-8' },
        body: requestXmlData,
    })
    if (res.status !== HttpStatus.Ok) {
        throw new HttpException(HttpStatus.BadRequest, 'Invalid 019SMS request.')
    }
    const responseXmlData = await res.text()

    const responseData = parseSmsResponse(responseXmlData)
    if (responseData.status !== ResponseCode.Success) {
        throw new HttpException(HttpStatus.BadRequest, `[${responseData.status}] ${responseData.message}`)
    }

    return responseData
}

function parseSmsResponse(xmlResponse): SmsResponseData {
    const response = convert.xml2js(xmlResponse, { compact: true }) as convert.ElementCompact
    return {
        status: response.sms?.status !== undefined ? Number(response.sms.status._text) : undefined,
        message: response.sms?.message?._text,
        shipment_id: response.sms?.shipment_id !== undefined ? Number(response.sms.shipment_id._text) : undefined,
    } as SmsResponseData
}
