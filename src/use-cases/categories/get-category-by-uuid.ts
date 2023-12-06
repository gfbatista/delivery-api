import { CategoriesRepository } from '@/repositories/categories-repository';
import { Category } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetCategoryByUuidUseCaseRequest {
    uuid: string
  }

export class GetCategoryByUuidUseCase {
    constructor(private categoryRepository: CategoriesRepository) { }

    async execute({ uuid } : GetCategoryByUuidUseCaseRequest): Promise<Category | null> {
        const category = await this.categoryRepository.findByUuid(uuid);

        if (!category){
            throw new ResourceNotFoundError();
        }

        return category;
    }
}