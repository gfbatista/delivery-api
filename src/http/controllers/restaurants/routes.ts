import { FastifyInstance } from 'fastify';
import { createRestaurant } from './create-restaurant';
import { getRestaurantByUuid } from './get-restaurant-by-uuid';
import { deleteRestaurant } from './delete-restaurant';
import { getAllRetaurants } from './get-all-restaurants';

export async function restaurantsRoutes(app: FastifyInstance) {
    app.post('/restaurants', createRestaurant);
    app.get('/restaurants/:uuid', getRestaurantByUuid);
    app.delete('/restaurants/:uuid', deleteRestaurant);
    app.get('/restaurants', getAllRetaurants);
}