import { NOT_FOUND, NO_CONTENT } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { UpdateAddressUseCase } from '@/use-cases/addresses/update-address';
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository';

export async function updateAddress(request: FastifyRequest, reply: FastifyReply) {
    const updateAddressBodySchema = z.object({
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

    const userId = Number(request.user.sub);

    const { street, city, district, state, number, zipcode, latitude, longitude } =
        updateAddressBodySchema.parse(request.body);

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