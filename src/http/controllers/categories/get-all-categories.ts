import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';
import { GetAllCategoriesUseCase } from '@/use-cases/categories/get-all-categories';
import { OK } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getAllCategories(_: FastifyRequest, reply: FastifyReply) {
    const categoriesRepository = new PrismaCategoriesRepository();
    const getCategoriesUseCase = new GetAllCategoriesUseCase(categoriesRepository);

    const { categories } = await getCategoriesUseCase.execute();

    return reply.status(OK).send(categories);
}