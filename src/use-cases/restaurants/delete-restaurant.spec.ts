import { expect, describe, it, beforeEach } from 'vitest';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryRestaurantsRepository } from '@/repositories/in-memory/in-memory-restaurants-repository';
import { DeleteRestaurantUseCase } from './delete-restaurant';

let restaurantsRepository: InMemoryRestaurantsRepository;
let deleteRestaurantUseCase: DeleteRestaurantUseCase;

describe('Delete Restaurant Use Case', async () => {
    beforeEach(() => {
        restaurantsRepository = new InMemoryRestaurantsRepository();
        deleteRestaurantUseCase = new DeleteRestaurantUseCase(restaurantsRepository);
    });

    it('should be able to delete a restaurant', async () => {
        await restaurantsRepository.create({
            uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94',
            name: 'Delícia Lanches',
            categoryId: 1,
            description: 'Hamburgueria',
            street: 'Rua da Esperança',
            city: 'Franca',
            district: 'Parque Castelo',
            state: 'SP',
            number: 601,
            zipcode: '14403-000',
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        await deleteRestaurantUseCase.execute({ uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94' });

        const restaurant = await restaurantsRepository.findByUuid('00a860ab-eea8-4278-a7e2-450ddb82ea94');
        expect(restaurant?.deletedAt).toEqual(expect.any(Date));
    });

    it('should not be able to delete a restaurant with wrong uuid', async () => {
        await expect(() =>
            deleteRestaurantUseCase.execute({ uuid: '433a4fb5-92fa-4b6d-96ba-cb99d2909d8e' }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
