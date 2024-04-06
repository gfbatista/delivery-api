import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { GetOrderByUuidUseCase } from '@/use-cases/orders/get-order-by-uuid';
import { FastifyReply, FastifyRequest } from 'fastify';
import { NOT_FOUND, OK } from 'http-status';
import { z } from 'zod';

export async function getOrderByUuid(request: FastifyRequest, reply: FastifyReply) {
    const getOrderByUuidParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = getOrderByUuidParamsSchema.parse(request.params);

    try {
        const ordersRepository = new PrismaOrdersRepository();
        const getOrderByUuidUseCase = new GetOrderByUuidUseCase(ordersRepository);

        const user = await getOrderByUuidUseCase.execute({ uuid });

        return reply.status(OK).send(user);      
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}