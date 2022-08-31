import { SMS_SOURCE_REGEXP } from '@/sms019'
import { IsString, Validate, Matches } from 'class-validator'
import { IsStringOrStringArray } from './validators/string-or-string-array.validator'

export class SendSmsDto {
    @IsString()
    @Matches(SMS_SOURCE_REGEXP)
    public source: string

    @Validate(IsStringOrStringArray)
    public phone: string | string[]

    @IsString()
    public message: string
}
