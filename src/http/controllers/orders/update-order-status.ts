import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { UpdateOrderStatusUseCase } from '@/use-cases/orders/update-order-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { NOT_FOUND, NO_CONTENT } from 'http-status';
import { z } from 'zod';

export async function updateOrderStatus(request: FastifyRequest, reply: FastifyReply) {
    const updateOrderStatusBodySchema = z.object({
        status: z.enum(['CREATED', 'ACCEPTED', 'COLLECTED', 'DELIVERED', 'CANCELED'])
    });

    const { status } =
        updateOrderStatusBodySchema.parse(request.body);

    const updateOrderStatusParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = updateOrderStatusParamsSchema.parse(request.params);

    try {
        const ordersRepository = new PrismaOrdersRepository();
        const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(ordersRepository);

        await updateOrderStatusUseCase.execute({
            uuid,
            orderStatus: status
        });

        return reply.status(NO_CONTENT).send();
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}