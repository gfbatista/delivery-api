import { FastifyInstance } from 'fastify';
import { createCategory } from './create-category';
import { getAllCategories } from './get-all-categories';
import { getCategoryByUuid } from './get-category-by-uuid';
import { deleteCategory } from './delete-category';
import { updateCategory } from './update-category';

export async function categoriesRoutes(app: FastifyInstance) {
    app.post('/categories', createCategory);
    app.get('/categories', getAllCategories);
    app.get('/categories/:uuid', getCategoryByUuid);
    app.patch('/categories/:uuid', updateCategory);
    app.delete('/categories/:uuid', deleteCategory);
}