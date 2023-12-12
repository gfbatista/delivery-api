import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';
import { NOT_FOUND, NO_CONTENT } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UpdateCategoryUseCase } from '@/use-cases/categories/update-category';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export async function updateCategory(request: FastifyRequest, reply: FastifyReply) {
    const updateCategoryBodySchema = z.object({
        description: z.string().min(5),
        slug: z.string().min(3),
    });

    const { description, slug } =
        updateCategoryBodySchema.parse(request.body);

    const updateCategoryParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = updateCategoryParamsSchema.parse(request.params);

    try {
        const categoriesRepository = new PrismaCategoriesRepository();
        const updateCategoryUseCase = new UpdateCategoryUseCase(categoriesRepository);

        await updateCategoryUseCase.execute({
            uuid,
            description,
            slug
        });

        return reply.status(NO_CONTENT).send();
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}