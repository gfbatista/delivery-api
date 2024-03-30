import { FastifyInstance } from 'fastify';
import { createRestaurant } from './create-restaurant';
import { getRestaurantByUuid } from './get-restaurant-by-uuid';

export async function restaurantsRoutes(app: FastifyInstance) {
    app.post('/restaurants', createRestaurant);
    app.get('/restaurants/:uuid', getRestaurantByUuid);
}