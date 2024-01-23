import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository';
import { GetAddressByUuidUseCase } from '@/use-cases/addresses/get-address-by-uuid';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { OK, NOT_FOUND } from 'http-status';
import { z } from 'zod';

export async function getAddressByUuid(request: FastifyRequest, reply: FastifyReply) {
    const getAddressByUuidParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = getAddressByUuidParamsSchema.parse(request.params);

    try {
        const addressesRepository = new PrismaAddressesRepository();
        const getAddressByUuidUseCase = new GetAddressByUuidUseCase(addressesRepository);

        const address = await getAddressByUuidUseCase.execute({ uuid });

        return reply.status(OK).send(address);
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}