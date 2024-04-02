import { CREATED, NOT_FOUND } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { PrismaRestaurantsRepository } from '@/repositories/prisma/prisma-restaurants-repository';
import { CreateRestaurantUseCase } from '@/use-cases/restaurants/create-restaurant';
import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';
import { restaurantBodySchema } from './restaurant-body-schema';

export async function createRestaurant(request: FastifyRequest, reply: FastifyReply) {
    const { name, description, category, street, city, district, state, number, zipcode, latitude, longitude } = restaurantBodySchema.parse(request.body);

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