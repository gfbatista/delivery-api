import { describe, it, beforeEach, expect } from 'vitest';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryRestaurantsRepository } from '@/repositories/in-memory/in-memory-restaurants-repository';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { UpdateRestaurantUseCase } from './update-restaurant';

let restaurantsRepository: InMemoryRestaurantsRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let updateRestaurantUseCase: UpdateRestaurantUseCase;

describe('Update Restaurant Use Case', () => {
    beforeEach(() => {
        restaurantsRepository = new InMemoryRestaurantsRepository();
        categoriesRepository = new InMemoryCategoriesRepository();
        updateRestaurantUseCase = new UpdateRestaurantUseCase(restaurantsRepository, categoriesRepository);
    });

    it('should to update a restaurant', async () => {
        await categoriesRepository.create({
            description: 'Hamburgueria',
            slug: 'Hamburgueria'
        });

        await restaurantsRepository.create({
            uuid: '000d561e-fe8b-4ab5-9d48-825c0d48a3e9',
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

        await updateRestaurantUseCase.execute({
            uuid: '000d561e-fe8b-4ab5-9d48-825c0d48a3e9',
            name: 'Top Lanches',
            category: {
                id: 1
            },
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

        const restaurant = await restaurantsRepository.findByUuid('000d561e-fe8b-4ab5-9d48-825c0d48a3e9');
        expect(restaurant?.name).toEqual('Top Lanches');
    });

    it('should not be able to update a restaurant with wrong uuid', async () => {
        await expect(() =>
            updateRestaurantUseCase.execute({
                uuid: '39e24d71-467e-4430-835f-1710cb4a271e',
                name: 'Top Lanches',
                category: {
                    id: 1
                },
                description: 'Hamburgueria',
                street: 'Rua da Esperança',
                city: 'Franca',
                district: 'Parque Castelo',
                state: 'SP',
                number: 601,
                zipcode: '14403-000',
                latitude: -21.0460305,
                longitude: -47.6808633
            },)
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it('should not be able to update a restaurant with wrong category', async () => {
        await categoriesRepository.create({
            description: 'Hamburgueria',
            slug: 'Hamburgueria'
        });

        await restaurantsRepository.create({
            uuid: '000d561e-fe8b-4ab5-9d48-825c0d48a3e9',
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

        await expect(() =>
            updateRestaurantUseCase.execute({
                uuid: '000d561e-fe8b-4ab5-9d48-825c0d48a3e9',
                name: 'Delícia Lanches',
                category: {
                    id: 2
                },
                description: 'Hamburgueria',
                street: 'Rua da Esperança',
                city: 'Franca',
                district: 'Parque Castelo',
                state: 'SP',
                number: 601,
                zipcode: '14403-000',
                latitude: -21.0460305,
                longitude: -47.6808633
            },)
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
