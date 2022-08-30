import { IsObject, IsOptional, IsString } from 'class-validator'
import type { Request } from 'node-fetch'

export class CreateRequestDto {
    @IsString()
    url: string

    @IsOptional()
    @IsObject()
    data?: Request
}
