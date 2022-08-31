import { NextFunction, Request, Response } from 'express'
import { SendSmsDto } from '@/dtos/sms019.dto'
import { HttpStatus } from '@/constants/http-status'
import { sendSms } from '@/sms019'

class Sms019Controller {
    public sendSms = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body as SendSmsDto
            const result = await sendSms(data)
            res.status(HttpStatus.Ok).json({
                data: result,
                message: 'sendSms',
            })
        } catch (error) {
            next(error)
        }
    }
}

export default Sms019Controller
