import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { CreateCategoryUseCase } from './create-category';

let categoriesRepository: InMemoryCategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create Category Use Case', () => {
    beforeEach(() => {
        categoriesRepository = new InMemoryCategoriesRepository();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    });

    it('should to create a category', async () => {
        const { category } = await createCategoryUseCase.execute({
            description: 'Hamburgueria',
            slug: 'Hamburgueria'
        });

        expect(category.description).toEqual(expect.any(String));
    });
});
