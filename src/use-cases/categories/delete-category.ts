import { CategoriesRepository } from '@/repositories/categories-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetCategoryByUuidUseCaseRequest {
    uuid: string
  }

export class DeleteCategoryUseCase {
    constructor(private categoryRepository: CategoriesRepository) { }

    async execute({ uuid } : GetCategoryByUuidUseCaseRequest): Promise<void> {
        const category = await this.categoryRepository.findByUuid(uuid);

        if (!category){
            throw new ResourceNotFoundError();
        }

        category.deletedAt = new Date();
        this.categoryRepository.save(category);
    }
}