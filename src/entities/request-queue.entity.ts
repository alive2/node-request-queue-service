import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { IRequest } from '@/interfaces/request-queue.interface'

@Entity()
export class RequestEntity extends BaseEntity implements IRequest {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    url: string

    @Column({ type: 'simple-json', nullable: true })
    data?: IRequest['data']

    @Column({ default: 0 })
    attempts: number

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}
