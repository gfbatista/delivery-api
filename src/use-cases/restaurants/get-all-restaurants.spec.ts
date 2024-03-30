import { InMemoryRestaurantsRepository } from '@/repositories/in-memory/in-memory-restaurants-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetAllRestaurantsUseCase } from './get-all-restaurants';

let restaurantsRepository: InMemoryRestaurantsRepository;
let getAllRestaurantsUseCase: GetAllRestaurantsUseCase;

describe('Get all Restaurants Use Case', () => {
    beforeEach(() => {
        restaurantsRepository = new InMemoryRestaurantsRepository();
        getAllRestaurantsUseCase = new GetAllRestaurantsUseCase(restaurantsRepository);
    });

    it('should be able to get all restaurants', async () => {
        await restaurantsRepository.create({
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

        const { restaurants } = await getAllRestaurantsUseCase.execute(1);

        expect(restaurants).toHaveLength(1);
        expect(restaurants).toEqual([expect.objectContaining({ description: 'Hamburgueria' })]);
    });
});
