import { CREATED, NOT_FOUND } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository';
import { CreateAddressUseCase } from '@/use-cases/addresses/create-address';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { addressBodySchema } from './address-body-schema';

export async function createAddress(request: FastifyRequest, reply: FastifyReply) {
    const userId = Number(request.user.sub);

    const { street, city, district, state, number, zipcode, latitude, longitude } =
        addressBodySchema.parse(request.body);

    try {
        const addressesRepository = new PrismaAddressesRepository();

        const createAddressUseCase = new CreateAddressUseCase(addressesRepository);

        const { address } = await createAddressUseCase.execute({
            userId,
            street,
            city,
            district,
            state,
            number,
            zipcode,
            latitude,
            longitude
        });

        return reply.status(CREATED).send(address);
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}