import { prisma } from '@/config/prisma';
import { Order, Prisma } from '@prisma/client';
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
}