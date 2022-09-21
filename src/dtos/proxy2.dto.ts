import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator'
import type { Request } from 'node-fetch'

export class Proxy2Dto {
    @IsString()
    url: string

    @IsOptional()
    @IsObject()
    data?: Request

    @IsOptional()
    @IsBoolean()
    queueOnTimeout?: boolean
}
