import { FastifyInstance } from 'fastify';
import { create } from './create-categories';

export async function categoriesRoutes(app: FastifyInstance) {
    app.post('/categories', create);
}