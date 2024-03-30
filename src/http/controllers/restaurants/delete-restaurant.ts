import { PrismaRestaurantsRepository } from '@/repositories/prisma/prisma-restaurants-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { DeleteRestaurantUseCase } from '@/use-cases/restaurants/delete-restaurant';
import { FastifyReply, FastifyRequest } from 'fastify';
import { NOT_FOUND, NO_CONTENT } from 'http-status';
import { z } from 'zod';

export async function deleteRestaurant(request: FastifyRequest, reply: FastifyReply) {
    const deleteRestaurantParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = deleteRestaurantParamsSchema.parse(request.params);

    try {
        const restaurantsRepository = new PrismaRestaurantsRepository();
        const deleteRestaurantUseCase = new DeleteRestaurantUseCase(restaurantsRepository);

        await deleteRestaurantUseCase.execute({ uuid });

        return reply.status(NO_CONTENT).send();
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}