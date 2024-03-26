import { NOT_FOUND, NO_CONTENT } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { UpdateAddressUseCase } from '@/use-cases/addresses/update-address';
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository';
import { addressBodySchema } from './address-body-schema';

export async function updateAddress(request: FastifyRequest, reply: FastifyReply) {
    const userId = Number(request.user.sub);

    const { street, city, district, state, number, zipcode, latitude, longitude } =
        addressBodySchema.parse(request.body);

    const updateAddressParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = updateAddressParamsSchema.parse(request.params);

    try {
        const addressesRepository = new PrismaAddressesRepository();
        const updateAddressUseCase = new UpdateAddressUseCase(addressesRepository);

        await updateAddressUseCase.execute({
            userId,
            uuid,
            street,
            city,
            district,
            state,
            number,
            zipcode,
            latitude,
            longitude
        });

        return reply.status(NO_CONTENT).send();
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}