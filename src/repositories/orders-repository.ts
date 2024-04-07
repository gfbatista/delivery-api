import { Order, OrderPaymentEnum, OrderStatusEnum, Prisma } from '@prisma/client';

export interface OrdersRepository {
    create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>
    findManyByUser(userId: number, page: number): Promise<Order[]>
    findByUuid(uuid: string): Promise<Order | null>
    updateOrderRate(uuid: string, rate: number): Promise<void>
    updateOrderStatus(uuid: string, orderStatus: OrderStatusEnum): Promise<void>
    updateOrderPayment(uuid: string, orderPayment: OrderPaymentEnum): Promise<void>
    save(data: Prisma.OrderUncheckedCreateInput, uuid: string): Promise<void>
}