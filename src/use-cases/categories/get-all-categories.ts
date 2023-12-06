import { CategoriesRepository } from '@/repositories/categories-repository';
import { Category } from '@prisma/client';

interface GetCategoriesUseCaseResponse {
    categories: Category[]
}

export class GetAllCategoriesUseCase {
    constructor(private categoryRepository: CategoriesRepository) { }

    async execute(): Promise<GetCategoriesUseCaseResponse> {
        const categories = await this.categoryRepository.findMany();

        return { categories };
    }
}