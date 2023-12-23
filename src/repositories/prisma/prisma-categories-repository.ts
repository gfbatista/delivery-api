import { Category, Prisma } from '@prisma/client';
import { CategoriesRepository } from '../categories-repository';
import { prisma } from '@/config/prisma';

export class PrismaCategoriesRepository implements CategoriesRepository {
    async create(data: Prisma.CategoryCreateInput) {
        const category = await prisma.category.create({
            data,
        });

        return category;
    }

    async findMany(page: number): Promise<Category[]> {
        const categories = await prisma.category.findMany({
            where: {
                deletedAt: null
            },
            skip: (page - 1) * 10,
            take: 10,
        });

        return categories;
    }

    async findByUuid(uuid: string): Promise<Category | null> {
        const category = await prisma.category.findUnique({
            where: {
                uuid,
            },
        });

        return category;
    }

    async delete(category: Category): Promise<void> {
        await prisma.category.update({
            where: {
                id: category.id,
            },
            data: category,
        });
    }

    async save(data: Prisma.CategoryUncheckedCreateInput, uuid: string): Promise<void> {
        await prisma.category.update({
            where: {
                uuid,
            },
            data,
        });
    }
}