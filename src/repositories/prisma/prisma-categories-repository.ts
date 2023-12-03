import { Prisma } from '@prisma/client';
import { CategoriesRepository } from '../categories-repository';
import { prisma } from '@/lib/prisma';

export class PrismaCategoriesRepository implements CategoriesRepository {
    async create(data: Prisma.CategoryCreateInput) {
        const category = await prisma.category.create({
            data,
        });

        return category;
    }
}