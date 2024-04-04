import { prisma } from '@/config/prisma';
import { Prisma } from '@prisma/client';
import { OrdersRepository } from '../orders-repository';

export class PrismaOrdersRepository implements OrdersRepository {
    async create(data: Prisma.OrderUncheckedCreateInput) {
        const order = await prisma.order.create({
            data,
        });

        return order;
    }
}