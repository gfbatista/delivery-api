import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';
import { CreateCategoryUseCase } from '@/use-cases/categories/create-category';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createCategoryBodySchema = z.object({
        description: z.string().min(5),
        slug:z.string().min(3),
    });

    const { description, slug } =
    createCategoryBodySchema.parse(request.body);

    const categoriesRepository = new PrismaCategoriesRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

    const { category } = await createCategoryUseCase.execute({
        description,
        slug
    });

    return reply.status(201).send(category);
}