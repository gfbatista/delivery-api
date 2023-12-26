import { PrismaDeliverymenRepository } from '@/repositories/prisma/prisma-deliverymen-repository';
import { GetDeliverymanByUuidUseCase } from '@/use-cases/deliverymen/get-deliveryman-by-uuid';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { OK, NOT_FOUND } from 'http-status';
import { z } from 'zod';

export async function getDeliverymanByUuid(request: FastifyRequest, reply: FastifyReply) {
    const getDeliverymanByUuidParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = getDeliverymanByUuidParamsSchema.parse(request.params);

    try {
        const deliverymenRepository = new PrismaDeliverymenRepository();
        const getDeliverymanByUuidUseCase = new GetDeliverymanByUuidUseCase(deliverymenRepository);

        const deliveryman = await getDeliverymanByUuidUseCase.execute({ uuid });

        return reply.status(OK).send(deliveryman);
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}