import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';
import { GetCategoryByUuidUseCase } from '@/use-cases/categories/get-category-by-uuid';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { OK, NOT_FOUND } from 'http-status';
import { z } from 'zod';

export async function getCategoryByUuid(request: FastifyRequest, reply: FastifyReply) {
    const getCategoryByUuidParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = getCategoryByUuidParamsSchema.parse(request.params);

    try {
        const categoriesRepository = new PrismaCategoriesRepository();
        const getCategoryByUuidUseCase = new GetCategoryByUuidUseCase(categoriesRepository);

        const categories = await getCategoryByUuidUseCase.execute({ uuid });

        return reply.status(OK).send(categories);
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}