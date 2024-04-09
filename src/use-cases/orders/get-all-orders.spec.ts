import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetAllOrdersByUserUseCase } from './get-all-orders';
import { InMemoryRestaurantsRepository } from '@/repositories/in-memory/in-memory-restaurants-repository';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository';
import { OrderPaymentEnum, OrderStatusEnum } from '@prisma/client';

let ordersRepository: InMemoryOrdersRepository;
let addressesRepository: InMemoryAddressesRepository;
let restaurantsRepository: InMemoryRestaurantsRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let usersRepository: InMemoryUsersRepository;
let getAllOrdersByUserUseCase: GetAllOrdersByUserUseCase;

describe('Get all Orders by User Use Case', () => {
    beforeEach(() => {
        ordersRepository = new InMemoryOrdersRepository();
        addressesRepository = new InMemoryAddressesRepository();
        restaurantsRepository = new InMemoryRestaurantsRepository();
        categoriesRepository = new InMemoryCategoriesRepository();
        usersRepository = new InMemoryUsersRepository();
        getAllOrdersByUserUseCase = new GetAllOrdersByUserUseCase(ordersRepository);
    });

    it('should be able to get all orders by users', async () => {
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
            userId: 1,
            restaurantId: 1,
            addressId: 1,
            total: 10.5
        });

        const { orders } = await getAllOrdersByUserUseCase.execute(1, OrderPaymentEnum.NOT_PAID, OrderStatusEnum.CREATED, 1);

        expect(orders).toHaveLength(1);
        expect(orders).toEqual([expect.objectContaining({ total: 10.5 })]);
    });

    it('should be able to get a empty order array', async () => {
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

        const { orders } = await getAllOrdersByUserUseCase.execute(1, OrderPaymentEnum.NOT_PAID, OrderStatusEnum.CREATED, 1);

        expect(orders).toHaveLength(0);
    });
});
