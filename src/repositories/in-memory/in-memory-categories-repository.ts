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
            updatedAt: new Date(),
            deletedAt: null,
        };

        this.categories.push(category);

        return category;
    }

    async findMany(page: number) {
        return this.categories
            .slice((page - 1) * 10, page * 10);
    }

    async findByUuid(uuid: string) {
        const category = this.categories.find((category) => category.uuid === uuid);

        if (!category) {
            return null;
        }
    
        return category;
    }

    async save(data: Prisma.CategoryUncheckedCreateInput, uuid: string) {
        const categoryIndex = this.categories.findIndex((item) => item.uuid === uuid);

        if (categoryIndex >= 0) {
            const category = {
                id: data.id ?? 1,
                uuid: data.uuid ?? randomUUID(),
                description: data.description,
                slug: data.slug,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            };
            this.categories[categoryIndex] = category;
        }
    }

    async delete(category: Category) {
        const categoryIndex = this.categories.findIndex((item) => item.id === category.id);

        if (categoryIndex >= 0) {
            this.categories[categoryIndex] = category;
        }
    }
}


