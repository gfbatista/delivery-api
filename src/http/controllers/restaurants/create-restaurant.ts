import { CREATED, NOT_FOUND } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { z } from 'zod';
import { PrismaRestaurantsRepository } from '@/repositories/prisma/prisma-restaurants-repository';
import { CreateRestaurantUseCase } from '@/use-cases/restaurants/create-restaurant';
import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';

export async function createRestaurant(request: FastifyRequest, reply: FastifyReply) {
    const createRestaurantBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        street: z.string(),
        category: z.object({
            id: z.number()
        }),
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

    const { name, description, category, street, city, district, state, number, zipcode, latitude, longitude } = createRestaurantBodySchema.parse(request.body);

    try {
        const restaurantsRepository = new PrismaRestaurantsRepository();
        const categoriesRepository = new PrismaCategoriesRepository();

        const createRestaurantUseCase = new CreateRestaurantUseCase(restaurantsRepository, categoriesRepository);

        const { restaurant } = await createRestaurantUseCase.execute({
            name, 
            description, 
            category, 
            street, 
            city, 
            district, 
            state, 
            number, 
            zipcode, 
            latitude, 
            longitude
        });

        return reply.status(CREATED).send(restaurant);
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}