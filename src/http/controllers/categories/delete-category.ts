import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';
import { DeleteCategoryUseCase } from '@/use-cases/categories/delete-category';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { NOT_FOUND, NO_CONTENT } from 'http-status';
import { z } from 'zod';

export async function deleteCategory(request: FastifyRequest, reply: FastifyReply) {
    const deleteCategoryParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = deleteCategoryParamsSchema.parse(request.params);

    try {
        const categoriesRepository = new PrismaCategoriesRepository();
        const deleteCategoryUseCase = new DeleteCategoryUseCase(categoriesRepository);

        const categories = await deleteCategoryUseCase.execute({ uuid });

        return reply.status(NO_CONTENT).send(categories);
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}