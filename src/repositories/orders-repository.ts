import { Order, Prisma } from '@prisma/client';

export interface OrdersRepository {
    create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>
    findManyByUser(userId: number, page: number): Promise<Order[]>
    findByUuid(uuid: string): Promise<Order | null>
}