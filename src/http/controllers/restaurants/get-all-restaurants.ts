import { PrismaRestaurantsRepository } from '@/repositories/prisma/prisma-restaurants-repository';
import { GetAllRestaurantsUseCase } from '@/use-cases/restaurants/get-all-restaurants';
import { FastifyReply, FastifyRequest } from 'fastify';
import { OK } from 'http-status';
import { z } from 'zod';

export async function getAllRetaurants(request: FastifyRequest, reply: FastifyReply) {
    const usersPageQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    });

    const { page } = usersPageQuerySchema.parse(request.query);

    const restaurantsRepository = new PrismaRestaurantsRepository();
    const getAllRestaurantsUseCase = new GetAllRestaurantsUseCase(restaurantsRepository);

    const { restaurants } = await getAllRestaurantsUseCase.execute(page);

    return reply.status(OK).send(restaurants);
}