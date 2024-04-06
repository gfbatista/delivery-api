import { prisma } from '@/config/prisma';
import { Order, OrderPaymentEnum, OrderStatusEnum, Prisma } from '@prisma/client';
import { OrdersRepository } from '../orders-repository';

export class PrismaOrdersRepository implements OrdersRepository {
    async create(data: Prisma.OrderUncheckedCreateInput) {
        const order = await prisma.order.create({
            data,
        });

        return order;
    }

    async findManyByUser(userId: number, page: number): Promise<Order[]> {
        const orders = await prisma.order.findMany({
            include: {
                address: true,
                user: true,
                restaurant: true
            },
            where: {
                userId
            },
            skip: (page - 1) * 10,
            take: 10,
        });

        return orders;
    }

    async findByUuid(uuid: string): Promise<Order | null> {
        const order = await prisma.order.findUnique({
            include: {
                address: true,
                user: true,
                restaurant: true
            },
            where: {
                uuid,
            },
        });

        return order;
    }

    async updateOrderRate(uuid: string, rate: number): Promise<void> {
        await prisma.order.update({
            where: {
                uuid,
            },
            data: {
                rate
            },
        });
    }

    async updateOrderStatus(uuid: string, orderStatus: OrderStatusEnum): Promise<void> {
        await prisma.order.update({
            where: {
                uuid,
            },
            data: {
                orderStatus
            },
        });
    }

    async updateOrderPayment(uuid: string, orderPayment: OrderPaymentEnum): Promise<void> {
        await prisma.order.update({
            where: {
                uuid,
            },
            data: {
                orderPayment
            },
        });
    }
}