import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';
import { PrismaRestaurantsRepository } from '@/repositories/prisma/prisma-restaurants-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { UpdateRestaurantUseCase } from '@/use-cases/restaurants/update-restaurant';
import { FastifyReply, FastifyRequest } from 'fastify';
import { NOT_FOUND, NO_CONTENT } from 'http-status';
import { z } from 'zod';

export async function updateRestaurant(request: FastifyRequest, reply: FastifyReply) {
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

    const { name, description, category, street, city, district, state, number, zipcode, latitude, longitude } =
        createRestaurantBodySchema.parse(request.body);

    const updateRestaurantParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = updateRestaurantParamsSchema.parse(request.params);

    try {
        const restaurantsRepository = new PrismaRestaurantsRepository();
        const categoriesRepository = new PrismaCategoriesRepository();
        const updateRestaurantUseCase = new UpdateRestaurantUseCase(restaurantsRepository, categoriesRepository);

        await updateRestaurantUseCase.execute({
            uuid,
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

        return reply.status(NO_CONTENT).send();
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}