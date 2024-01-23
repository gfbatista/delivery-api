import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository';
import { DeleteAddressUseCase } from '@/use-cases/addresses/delete-address';
import { AddressCannotBeDeletedError } from '@/use-cases/errors/address-cannot-be-deleted-error';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { BAD_REQUEST, NOT_FOUND, NO_CONTENT } from 'http-status';
import { z } from 'zod';

export async function deleteAddress(request: FastifyRequest, reply: FastifyReply) {
    const deleteAddressParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = deleteAddressParamsSchema.parse(request.params);

    try {
        const addressesRepository = new PrismaAddressesRepository();
        const deleteAddressUseCase = new DeleteAddressUseCase(addressesRepository);

        await deleteAddressUseCase.execute({ uuid });

        return reply.status(NO_CONTENT).send();    
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        if (err instanceof AddressCannotBeDeletedError) {
            return reply.status(BAD_REQUEST).send({ message: err.message });
        }

        throw err;
    }
}