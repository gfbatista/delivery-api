import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryRestaurantsRepository } from '@/repositories/in-memory/in-memory-restaurants-repository';
import { CreateRestaurantUseCase } from './create-restaurant';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let restaurantsRepository: InMemoryRestaurantsRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let createRestaurantUseCase: CreateRestaurantUseCase;

describe('Create Restaurant Use Case', () => {
    beforeEach(() => {
        restaurantsRepository = new InMemoryRestaurantsRepository();
        categoriesRepository = new InMemoryCategoriesRepository();
        createRestaurantUseCase = new CreateRestaurantUseCase(restaurantsRepository, categoriesRepository);
    });

    it('should to create a restaurant', async () => {

        await categoriesRepository.create({
            description: 'Hamburgueria',
            slug: 'Hamburgueria'
        });

        const { restaurant } = await createRestaurantUseCase.execute({
            name: 'Delícia Lanches',
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

        expect(restaurant.name).toEqual(expect.any(String));
        expect(restaurant.categoryId).toEqual(expect.any(Number));
    });

    it('should to create a restaurant without zipcode and number', async () => {
        await categoriesRepository.create({
            description: 'Hamburgueria',
            slug: 'Hamburgueria'
        });

        const { restaurant } = await createRestaurantUseCase.execute({
            name: 'Delícia Lanches',
            category: {
                id: 1
            },
            description: 'Hamburgueria',
            street: 'Rua da Esperança',
            city: 'Franca',
            district: 'Parque Castelo',
            state: 'SP',
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        expect(restaurant.name).toEqual(expect.any(String));
        expect(restaurant.categoryId).toEqual(expect.any(Number));
    });

    it('should to create a restaurant without zipcode and number', async () => {
        await categoriesRepository.create({
            description: 'Hamburgueria',
            slug: 'Hamburgueria'
        });

        const { restaurant } = await createRestaurantUseCase.execute({
            name: 'Delícia Lanches',
            category: {
                id: 1
            },
            description: 'Hamburgueria',
            street: 'Rua da Esperança',
            city: 'Franca',
            district: 'Parque Castelo',
            state: 'SP',
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        expect(restaurant.name).toEqual(expect.any(String));
        expect(restaurant.categoryId).toEqual(expect.any(Number));
    });

    it('should not be able to create a deliveryman with same drivers license', async () => {
        await expect(() =>
            createRestaurantUseCase.execute({
                name: 'Delícia Lanches',
                category: {
                    id: 1
                },
                description: 'Hamburgueria',
                street: 'Rua da Esperança',
                city: 'Franca',
                district: 'Parque Castelo',
                state: 'SP',
                latitude: -21.0460305,
                longitude: -47.6808633
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
