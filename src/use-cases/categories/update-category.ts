import { CategoriesRepository } from '@/repositories/categories-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface UpdateCategoryRequest {
    uuid: string,
    description: string
    slug: string
}

export class UpdateCategoryUseCase {
    constructor(private categoryRepository: CategoriesRepository) { }

    async execute({ uuid, description, slug }: UpdateCategoryRequest) {
        const category = await this.categoryRepository.findByUuid(uuid);

        if (!category) {
            throw new ResourceNotFoundError();
        }

        await this.categoryRepository.save({
            description,
            slug
        }, uuid);
    }
}