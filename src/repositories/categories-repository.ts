import { Category, Prisma } from '@prisma/client';

export interface CategoriesRepository {
    create(data: Prisma.CategoryCreateInput): Promise<Category>
    findMany(page: number): Promise<Category[]>
    findByUuid(uuid: string): Promise<Category | null>
    findById(id: number): Promise<Category | null>
    delete(category: Category): Promise<void>
    save(data: Prisma.CategoryUncheckedCreateInput, uuid: string): Promise<void>
}