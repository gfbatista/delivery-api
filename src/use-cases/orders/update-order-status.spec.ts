import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository';
import { InMemoryRestaurantsRepository } from '@/repositories/in-memory/in-memory-restaurants-repository';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UpdateOrderStatusUseCase } from './update-order-status';
import { OrderStatusEnum } from '@prisma/client';

let ordersRepository: InMemoryOrdersRepository;
let addressesRepository: InMemoryAddressesRepository;
let restaurantsRepository: InMemoryRestaurantsRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let usersRepository: InMemoryUsersRepository;
let updateOrderStatusUseCase: UpdateOrderStatusUseCase;

describe('Update Order Status Use Case', () => {
    beforeEach(() => {
        ordersRepository = new InMemoryOrdersRepository();
        addressesRepository = new InMemoryAddressesRepository();
        restaurantsRepository = new InMemoryRestaurantsRepository();
        categoriesRepository = new InMemoryCategoriesRepository();
        usersRepository = new InMemoryUsersRepository();
        updateOrderStatusUseCase = new UpdateOrderStatusUseCase(ordersRepository);
    });

    it('should to update a order status', async () => {
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
            uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94',
            userId: 1,
            restaurantId: 1,
            addressId: 1,
            total: 10.5
        });

        await updateOrderStatusUseCase.execute({
            uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94',
            orderStatus: 'COLLECTED'
        });

        const order = await ordersRepository.findByUuid('00a860ab-eea8-4278-a7e2-450ddb82ea94');
        expect(order?.orderStatus).toEqual(OrderStatusEnum.COLLECTED);
    });


    it('should not be able to update a order status with wrong uuid', async () => {
        await expect(() =>
            updateOrderStatusUseCase.execute({
                uuid: '90140f51-2dd3-44f0-894a-aafb5c7c93ec',
                orderStatus: 'COLLECTED'
            },)
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
