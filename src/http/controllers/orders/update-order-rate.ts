import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { UpdateOrderRateUseCase } from '@/use-cases/orders/update-order-rate';
import { FastifyReply, FastifyRequest } from 'fastify';
import { NOT_FOUND, NO_CONTENT } from 'http-status';
import { z } from 'zod';

export async function updateOrderRate(request: FastifyRequest, reply: FastifyReply) {
    const updateOrderRateBodySchema = z.object({
        rate: z.number(),
    });

    const { rate } =
    updateOrderRateBodySchema.parse(request.body);

    const updateOrderRateParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = updateOrderRateParamsSchema.parse(request.params);

    try {
        const ordersRepository = new PrismaOrdersRepository();
        const updateOrderRateUseCase = new UpdateOrderRateUseCase(ordersRepository);

        await updateOrderRateUseCase.execute({
            uuid,
            rate
        });

        return reply.status(NO_CONTENT).send();
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}