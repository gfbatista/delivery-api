import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { GetCategoryByUuidUseCase } from './get-category-by-uuid';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let categoriesRepository: InMemoryCategoriesRepository;
let getCategoryByUuidUseCase: GetCategoryByUuidUseCase;

describe('Get Category by Uuid Use Case', () => {
    beforeEach(() => {
        categoriesRepository = new InMemoryCategoriesRepository();
        getCategoryByUuidUseCase = new GetCategoryByUuidUseCase(categoriesRepository);
    });

    it('should be able to get category by uuid', async () => {
        await categoriesRepository.create({
            uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94',
            description: 'Hamburgueria',
            slug: 'Hamburgueria'
        });

        const category = await getCategoryByUuidUseCase.execute({ uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94' });

        expect(category?.uuid).toEqual('00a860ab-eea8-4278-a7e2-450ddb82ea94');
    });

    it('should not be able to get category with wrong uuid', async () => {
        await expect(() =>
            getCategoryByUuidUseCase.execute({ uuid: '433a4fb5-92fa-4b6d-96ba-cb99d2909d8e' }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
