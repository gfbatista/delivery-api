import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { GetAllCategoriesUseCase } from './get-all-categories';

let categoriesRepository: InMemoryCategoriesRepository;
let getCategoriesUseCase: GetAllCategoriesUseCase;

describe('Get all Categories Use Case', () => {
    beforeEach(() => {
        categoriesRepository = new InMemoryCategoriesRepository();
        getCategoriesUseCase = new GetAllCategoriesUseCase(categoriesRepository);
    });

    it('should be able to get all categories', async () => {
        await categoriesRepository.create({
            description: 'Hamburgueria',
            slug: 'Hamburgueria'
        });

        const { categories } = await getCategoriesUseCase.execute(1);
        
        expect(categories).toHaveLength(1);
        expect(categories).toEqual([expect.objectContaining({ description: 'Hamburgueria' })]);
    });
});
