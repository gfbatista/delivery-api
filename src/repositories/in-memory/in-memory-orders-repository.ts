import { Order, OrderPaymentEnum, OrderStatusEnum, Prisma } from '@prisma/client';
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
            orderPayment: OrderPaymentEnum.NOT_PAID,
            orderStatus: OrderStatusEnum.CREATED,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.orders.push(order);

        return order;
    }

    async findManyByUser(userId: number, page: number): Promise<Order[]> {
        return this.orders.filter((item) => item.userId === userId).slice((page - 1) * 10, page * 10);
    }

    async findByUuid(uuid: string) {
        const order = this.orders.find((order) => order.uuid === uuid);

        if (!order) {
            return null;
        }

        return order;
    }

    async updateOrderRate(uuid: string, rate: number) {
        const orderIndex = this.orders.findIndex((item) => item.uuid === uuid);

        if (orderIndex >= 0) {
            this.orders[orderIndex].rate = rate;
        }
    }

    async updateOrderStatus(uuid: string, orderStatus: OrderStatusEnum) {
        const orderIndex = this.orders.findIndex((item) => item.uuid === uuid);

        if (orderIndex >= 0) {
            this.orders[orderIndex].orderStatus = orderStatus;
        }
    }

    async updateOrderPayment(uuid: string, orderPayment: OrderPaymentEnum) {
        const orderIndex = this.orders.findIndex((item) => item.uuid === uuid);

        if (orderIndex >= 0) {
            this.orders[orderIndex].orderPayment = orderPayment;
        }
    }

    async save(data: Prisma.OrderUncheckedCreateInput, uuid: string) {
        const orderIndex = this.orders.findIndex((item) => item.uuid === uuid);

        if (orderIndex >= 0) {
            const order = {
                id: 1,
                uuid: data.uuid ?? randomUUID(),
                userId: data.userId,
                restaurantId: data.restaurantId,
                addressId: data.addressId,
                total: data.total,
                rate: data.rate ?? 0,
                orderPayment: data.orderPayment ?? OrderPaymentEnum.NOT_PAID,
                orderStatus: data.orderStatus ?? OrderStatusEnum.CREATED,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            this.orders[orderIndex] = order;
        }
    }
}


