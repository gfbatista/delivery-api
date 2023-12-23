import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';
import { GetAllCategoriesUseCase } from '@/use-cases/categories/get-all-categories';
import { OK } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getAllCategories(request: FastifyRequest, reply: FastifyReply) {
    const categoriesPageQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    });

    const { page } = categoriesPageQuerySchema.parse(request.query);
      
    const categoriesRepository = new PrismaCategoriesRepository();
    const getCategoriesUseCase = new GetAllCategoriesUseCase(categoriesRepository);

    const { categories } = await getCategoriesUseCase.execute(page);

    return reply.status(OK).send(categories);
}