import { Category, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { CategoriesRepository } from '../categories-repository';

export class InMemoryCategoriesRepository implements CategoriesRepository {
    public items: Category[] = [];

    async create(data: Prisma.CategoryCreateInput) {
        const category = {
            id: 1,
            uuid: data.uuid ?? randomUUID(),
            description: data.description,
            slug: data.slug,
            createdAt: new Date(),
            updatedAt: null,
            deletedAt: null,
        };

        this.items.push();

        return category;
    }
}


