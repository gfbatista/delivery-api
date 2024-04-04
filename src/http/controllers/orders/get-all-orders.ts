import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';
import { GetAllOrdersByUserUseCase } from '@/use-cases/orders/get-all-orders';
import { FastifyReply, FastifyRequest } from 'fastify';
import { OK } from 'http-status';
import { z } from 'zod';

export async function getAllOrdersByUser(request: FastifyRequest, reply: FastifyReply) {
    const userId = Number(request.user.sub);

    const categoriesPageQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    });

    const { page } = categoriesPageQuerySchema.parse(request.query);
      
    const ordersRepository = new PrismaOrdersRepository();
    const getAllOrdersByUserUseCase = new GetAllOrdersByUserUseCase(ordersRepository);

    const { orders } = await getAllOrdersByUserUseCase.execute(userId, page);

    return reply.status(OK).send(orders);
}