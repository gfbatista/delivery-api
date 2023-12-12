import { describe, it, beforeEach, expect } from 'vitest';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { UpdateCategoryUseCase } from './update-category';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let categoriesRepository: InMemoryCategoriesRepository;
let updateCategoryUseCase: UpdateCategoryUseCase;

describe('Update Category Use Case', () => {
    beforeEach(() => {
        categoriesRepository = new InMemoryCategoriesRepository();
        updateCategoryUseCase = new UpdateCategoryUseCase(categoriesRepository);
    });

    it('should to update a category', async () => {
        await categoriesRepository.create({
            uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94',
            description: 'Hamburgueria',
            slug: 'Hamburgueria'
        });

        await updateCategoryUseCase.execute({
            uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94',
            description: 'Comida Japonesa',
            slug: 'Japonesa'
        },);
    });

    it('should not be able to update a category with wrong uuid', async () => {
        await expect(() =>
            updateCategoryUseCase.execute({
                uuid: '8c8c48e3-1ea9-40db-9de0-7a90c146b4f9',
                description: 'Comida Japonesa',
                slug: 'Japonesa'
            },)
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
