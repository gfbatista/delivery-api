import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository';
import { CreateAddressUseCase } from './create-address';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let addressesRepository: InMemoryAddressesRepository;
let usersRepository: InMemoryUsersRepository;
let createAddressUseCase: CreateAddressUseCase;

describe('Create Address Use Case', () => {
    beforeEach(() => {
        addressesRepository = new InMemoryAddressesRepository();
        usersRepository = new InMemoryUsersRepository();
        createAddressUseCase = new CreateAddressUseCase(addressesRepository, usersRepository);
    });

    it('should to create a user address', async () => {
        await usersRepository.create({
            uuid: '759cafaa-5461-4ba8-9342-d01635c66d66',
            name: 'Gilberto Ferrari',
            email: 'gilberto@email.com',
            password: '99A29DC8105FD2FA39D8CDC04733938D',
            latitude: -21.0460305,
            longitude: -47.6808633
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

        const { address } = await createAddressUseCase.execute({
            uuid: '759cafaa-5461-4ba8-9342-d01635c66d66',
            street: 'Rua da Esperança',
            city: 'Franca',
            district: 'Parque Castelo',
            state: 'SP',
            number: 601,
            zipcode: '14403-000',
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        expect(address.city).toEqual(expect.any(String));
        expect(address.id).toEqual(expect.any(Number));
    });

    it('should not be able to create a address with wrong user uuid', async () => {
        await expect(() =>
            createAddressUseCase.execute({
                uuid: '759cafaa-5461-4ba8-9342-d01635c66d66',
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
