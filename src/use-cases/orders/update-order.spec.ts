import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository';
import { InMemoryRestaurantsRepository } from '@/repositories/in-memory/in-memory-restaurants-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { UpdateOrderUseCase } from './update-order';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let ordersRepository: InMemoryOrdersRepository;
let addressesRepository: InMemoryAddressesRepository;
let restaurantsRepository: InMemoryRestaurantsRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let usersRepository: InMemoryUsersRepository;
let updateOrderUseCase: UpdateOrderUseCase;

describe('Update Order Use Case', () => {
    beforeEach(() => {
        ordersRepository = new InMemoryOrdersRepository();
        addressesRepository = new InMemoryAddressesRepository();
        restaurantsRepository = new InMemoryRestaurantsRepository();
        categoriesRepository = new InMemoryCategoriesRepository();
        usersRepository = new InMemoryUsersRepository();
        updateOrderUseCase = new UpdateOrderUseCase(ordersRepository, addressesRepository, restaurantsRepository);
    });

    it('should to update a order', async () => {
        await usersRepository.create({
            uuid: '9ec3c693-e81b-4b95-b1d6-fbfd545c926a',
            name: 'José da Silva',
            email: 'jose@email.com',
            password: 'aaaa'
        });

        await addressesRepository.create({
            userId: 1,
            street: 'Rua II',
            city: 'Franca',
            district: 'Centro',
            state: 'SP',
            number: 999,
            zipcode: '14409-000',
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        await categoriesRepository.create({
            description: 'Choperia',
            slug: 'Choperia'
        });

        await restaurantsRepository.create({
            name: 'Choperia Paladium',
            categoryId: 1,
            description: 'Choperia',
            street: 'Rua III',
            city: 'Restinga',
            district: 'Centro',
            state: 'SP',
            number: 596,
            zipcode: '13303-000',
            latitude: -21.0460355,
            longitude: -47.6808636
        });

        await ordersRepository.create({
            uuid: '90668d54-781a-4179-98c4-a0d3f675d3ef',
            userId: 1,
            restaurantId: 1,
            addressId: 1,
            total: 32
        });

        await updateOrderUseCase.execute({
            uuid: '90668d54-781a-4179-98c4-a0d3f675d3ef',
            user: {
                id: 1
            },
            restaurant: {
                id: 1
            },
            address: {
                id: 1
            },
            total: 99
        });

        const order = await ordersRepository.findByUuid('90668d54-781a-4179-98c4-a0d3f675d3ef');

        expect(order?.userId).toEqual(1);
        expect(order?.addressId).toEqual(1);
        expect(order?.restaurantId).toEqual(1);
        expect(order?.total).toEqual(99);
    });

    it('should not be able to update a order with without a restaurant', async () => {
        await usersRepository.create({
            uuid: '759cafaa-5461-4ba8-9342-d01635c66d66',
            name: 'Gilberto Ferrari',
            email: 'gilberto@email.com',
            password: '99A29DC8105FD2FA39D8CDC04733938D'
        });

        await addressesRepository.create({
            userId: 1,
            street: 'Rua II',
            city: 'Franca',
            district: 'Centro',
            state: 'SP',
            number: 999,
            zipcode: '14409-000',
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        await expect(() =>
            updateOrderUseCase.execute({
                uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94',
                user: {
                    id: 1
                },
                restaurant: {
                    id: 1
                },
                address: {
                    id: 1
                },
                total: 99
            },)
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it('should not be able to create a order with without a address', async () => {
        await usersRepository.create({
            uuid: '759cafaa-5461-4ba8-9342-d01635c66d66',
            name: 'Gilberto Ferrari',
            email: 'gilberto@email.com',
            password: '99A29DC8105FD2FA39D8CDC04733938D'
        });

        await categoriesRepository.create({
            description: 'Hamburgueria',
            slug: 'Hamburgueria'
        });

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

        await expect(() =>
            updateOrderUseCase.execute({
                uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94',
                user: {
                    id: 1
                },
                restaurant: {
                    id: 1
                },
                address: {
                    id: 1
                },
                total: 99
            },)
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it('should not be able to create a order with wrong uuid ', async () => {
        await usersRepository.create({
            uuid: '759cafaa-5461-4ba8-9342-d01635c66d66',
            name: 'Gilberto Ferrari',
            email: 'gilberto@email.com',
            password: '99A29DC8105FD2FA39D8CDC04733938D'
        });

        await addressesRepository.create({
            userId: 1,
            street: 'Rua II',
            city: 'Franca',
            district: 'Centro',
            state: 'SP',
            number: 999,
            zipcode: '14409-000',
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        await categoriesRepository.create({
            description: 'Hamburgueria',
            slug: 'Hamburgueria'
        });

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

        await ordersRepository.create({
            uuid: 'b35c6607-b4f7-422b-a159-637197bc49cd',
            userId: 1,
            restaurantId: 1,
            addressId: 1,
            total: 10.5
        });

        await expect(() =>
            updateOrderUseCase.execute({
                uuid: '3a3f9af5-d4da-439a-8059-ada87d3205fe',
                user: {
                    id: 1
                },
                restaurant: {
                    id: 1
                },
                address: {
                    id: 1
                },
                total: 99
            },)
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

});
