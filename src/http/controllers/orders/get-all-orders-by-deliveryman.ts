import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';
import { GetAllOrdersByDeliverymanUseCase } from '@/use-cases/orders/get-all-orders-by-deliveryman';
import { FastifyReply, FastifyRequest } from 'fastify';
import { OK } from 'http-status';
import { z } from 'zod';

export async function getAllOrdersByDeliveryman(request: FastifyRequest, reply: FastifyReply) {
    const deliverymanId = Number(request.user.sub);

    const ordersPageQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    });

    const { page } = ordersPageQuerySchema.parse(request.query);

    const ordersRepository = new PrismaOrdersRepository();
    const getAllOrdersByDeliverymanUseCase = new GetAllOrdersByDeliverymanUseCase(ordersRepository);

    const { orders } = await getAllOrdersByDeliverymanUseCase.execute(deliverymanId, page);

    return reply.status(OK).send(orders);
}