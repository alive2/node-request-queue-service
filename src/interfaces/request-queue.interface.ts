import type { Request } from 'node-fetch'

export interface IRequest {
    id: number
    url: string
    data?: Request
}
