import { CREATED, NOT_FOUND } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository';
import { CreateAddressUseCase } from '@/use-cases/addresses/create-address';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export async function createAddress(request: FastifyRequest, reply: FastifyReply) {
    const createAddressBodySchema = z.object({
        street: z.string(),
        city: z.string(),
        district: z.string(),
        state: z.string(),
        number: z.number().optional(),
        zipcode: z.string().length(9).optional(),
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90;
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180;
        }),
    });

    const { street, city, district, state, number, zipcode, latitude, longitude } =
        createAddressBodySchema.parse(request.body);

    const updateAddressParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = updateAddressParamsSchema.parse(request.params);

    try {
        const addressesRepository = new PrismaAddressesRepository();
        const usersRepository = new PrismaUsersRepository();

        const createAddressUseCase = new CreateAddressUseCase(addressesRepository, usersRepository);

        const { address } = await createAddressUseCase.execute({
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

        return reply.status(CREATED).send(address);
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}