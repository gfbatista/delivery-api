import { expect, describe, it, beforeEach } from 'vitest';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryRestaurantsRepository } from '@/repositories/in-memory/in-memory-restaurants-repository';
import { GetRestaurantByUuidUseCase } from './get-restaurant-by-uuid';

let restaurantsRepository: InMemoryRestaurantsRepository;
let getRestaurantByUuidUseCase: GetRestaurantByUuidUseCase;

describe('Get Restaurant by Uuid Use Case', () => {
    beforeEach(() => {
        restaurantsRepository = new InMemoryRestaurantsRepository();
        getRestaurantByUuidUseCase = new GetRestaurantByUuidUseCase(restaurantsRepository);
    });

    it('should be able to get restaurant by uuid', async () => {
        await restaurantsRepository.create({
            uuid: 'bba771f2-e414-48a1-a619-a010fe4fab59',
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


        const restaurant = await getRestaurantByUuidUseCase.execute({ uuid: 'bba771f2-e414-48a1-a619-a010fe4fab59' });

        expect(restaurant?.uuid).toEqual('bba771f2-e414-48a1-a619-a010fe4fab59');
    });

    it('should not be able to get restaurant with wrong uuid', async () => {
        await expect(() =>
            getRestaurantByUuidUseCase.execute({ uuid: '433a4fb5-92fa-4b6d-96ba-cb99d2909d8e' }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
