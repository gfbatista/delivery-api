import { Category, Prisma } from '@prisma/client';

export interface CategoriesRepository {
    create(data: Prisma.CategoryCreateInput): Promise<Category>
    findMany(): Promise<Category[]>
    findByUuid(uuid: string): Promise<Category | null>
    save(category: Category): Promise<void>
}