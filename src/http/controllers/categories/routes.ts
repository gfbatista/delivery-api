import { FastifyInstance } from 'fastify';
import { createCategory } from './create-category';
import { getAllCategories } from './get-all-categories';
import { getCategoryByUuid } from './get-category-by-uuid';

export async function categoriesRoutes(app: FastifyInstance) {
    app.post('/categories', createCategory);
    app.get('/categories', getAllCategories);
    app.get('/categories/:uuid', getCategoryByUuid);
}