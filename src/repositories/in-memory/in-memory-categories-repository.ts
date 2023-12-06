import { Category, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { CategoriesRepository } from '../categories-repository';

export class InMemoryCategoriesRepository implements CategoriesRepository {
    public categories: Category[] = [];

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

        this.categories.push(category);

        return category;
    }

    async findMany() {
        return this.categories; 
    }

    async findByUuid(uuid: string) {
        const category = this.categories.find((category) => category.uuid === uuid);

        if (!category) {
            return null;
        }
    
        return category;
    }
}


