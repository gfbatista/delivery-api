import { CategoriesRepository } from '@/repositories/categories-repository';

interface CreateCategoryRequest {
    description: string
    slug: string
}

export class CreateCategoryUseCase {
    constructor(private categoryRepository: CategoriesRepository) {}

    async execute({ description, slug }: CreateCategoryRequest){
        const category = await this.categoryRepository.create({
            description,
            slug
        });

        return { category };
    }
}