import { NOT_FOUND, NO_CONTENT } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository';
import { UpdatePrimaryAddressUseCase } from '@/use-cases/addresses/update-primary-address';

export async function updatePrimaryAddress(request: FastifyRequest, reply: FastifyReply) {
    const updatePrimaryAddressBodySchema = z.object({
        primary: z.boolean(),
    });

    const { primary } =
        updatePrimaryAddressBodySchema.parse(request.body);

    const updatePrimaryAddressParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = updatePrimaryAddressParamsSchema.parse(request.params);

    try {
        const addressesRepository = new PrismaAddressesRepository();
        const updatePrimaryAddressUseCase = new UpdatePrimaryAddressUseCase(addressesRepository);

        await updatePrimaryAddressUseCase.execute({
            uuid,
            primary
        });

        return reply.status(NO_CONTENT).send();
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}