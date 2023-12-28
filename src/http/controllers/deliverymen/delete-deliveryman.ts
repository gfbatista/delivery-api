import { PrismaDeliverymenRepository } from '@/repositories/prisma/prisma-deliverymen-repository';
import { DeleteDeliverymanUseCase } from '@/use-cases/deliverymen/delete-deliveryman';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { NOT_FOUND, NO_CONTENT } from 'http-status';
import { z } from 'zod';

export async function deleteDeliveryman(request: FastifyRequest, reply: FastifyReply) {
    const deleteDeliverymanParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = deleteDeliverymanParamsSchema.parse(request.params);

    try {
        const deliverymenRepository = new PrismaDeliverymenRepository();
        const deleteDeliverymanUseCase = new DeleteDeliverymanUseCase(deliverymenRepository);

        await deleteDeliverymanUseCase.execute({ uuid });

        return reply.status(NO_CONTENT).send();
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}