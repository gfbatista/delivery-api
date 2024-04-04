import { Order, OrderStatusEnum, PaymentStatusEnum, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { OrdersRepository } from '../orders-repository';

export class InMemoryOrdersRepository implements OrdersRepository {
    public orders: Order[] = [];

    async create(data: Prisma.OrderUncheckedCreateInput) {
        const order = {
            id: 1,
            uuid: data.uuid ?? randomUUID(),
            userId: data.userId,
            restaurantId: data.restaurantId,
            addressId: data.addressId,
            total: data.total,
            rate: data.rate ?? 0,
            paymentStatus: PaymentStatusEnum.NOT_PAID,
            orderStatus: OrderStatusEnum.CREATED,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.orders.push(order);

        return order;
    }
}


