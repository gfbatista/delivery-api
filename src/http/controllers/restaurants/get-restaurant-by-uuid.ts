import { PrismaRestaurantsRepository } from '@/repositories/prisma/prisma-restaurants-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { GetRestaurantByUuidUseCase } from '@/use-cases/restaurants/get-restaurant-by-uuid';
import { FastifyReply, FastifyRequest } from 'fastify';
import { NOT_FOUND, OK } from 'http-status';
import { z } from 'zod';

export async function getRestaurantByUuid(request: FastifyRequest, reply: FastifyReply) {
    const getRestaurantByUuidParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = getRestaurantByUuidParamsSchema.parse(request.params);

    try {
        const restaurantsRepository = new PrismaRestaurantsRepository();
        const getRestaurantByUuidUseCase = new GetRestaurantByUuidUseCase(restaurantsRepository);

        const restaurant = await getRestaurantByUuidUseCase.execute({ uuid });

        return reply.status(OK).send(restaurant);
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}