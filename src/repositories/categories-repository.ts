import { Category, Prisma } from '@prisma/client';

export interface CategoriesRepository {
    create(data: Prisma.CategoryCreateInput): Promise<Category>
}