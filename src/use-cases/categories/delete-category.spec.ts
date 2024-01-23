import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { DeleteCategoryUseCase } from './delete-category';

let categoriesRepository: InMemoryCategoriesRepository;
let deleteCategoryUseCase: DeleteCategoryUseCase;

describe('Delete Category Use Case', async () => {
    beforeEach(() => {
        categoriesRepository = new InMemoryCategoriesRepository();
        deleteCategoryUseCase = new DeleteCategoryUseCase(categoriesRepository);
    });

    it('should be able to delete a category', async () => {
        await categoriesRepository.create({
            uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94',
            description: 'Hamburgueria',
            slug: 'Hamburgueria'
        });

        await deleteCategoryUseCase.execute({ uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94' });

        const category = await categoriesRepository.findByUuid('00a860ab-eea8-4278-a7e2-450ddb82ea94');
        expect(category?.deletedAt).toEqual(expect.any(Date));
    });

    it('should not be able to delete a category with wrong uuid', async () => {
        await expect(() =>
            deleteCategoryUseCase.execute({ uuid: '433a4fb5-92fa-4b6d-96ba-cb99d2909d8e' }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
