import { describe, it, beforeEach, expect } from 'vitest';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository';
import { UpdateAddressUseCase } from './update-address';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let addressesRepository: InMemoryAddressesRepository;
let usersRepository: InMemoryUsersRepository;
let updateAddressesUseCase: UpdateAddressUseCase;

describe('Update Address Use Case', () => {
    beforeEach(() => {
        addressesRepository = new InMemoryAddressesRepository();
        usersRepository = new InMemoryUsersRepository();
        updateAddressesUseCase = new UpdateAddressUseCase(addressesRepository, usersRepository);
    });

    it('should to update a user address', async () => {
        await usersRepository.create({
            uuid: '00eebae1-d24e-4089-bc2a-5779a71890a9',
            name: 'Gilberto Ferrari',
            email: 'gilberto@email.com',
            password: '99A29DC8105FD2FA39D8CDC04733938D',
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        await addressesRepository.create({
            uuid: '90140f51-2dd3-44f0-894a-aafb5c7c93ec',
            userId: 1,
            street: 'Rua II',
            city: 'Franca',
            district: 'Centro',
            state: 'SP',
            number: 999,
            zipcode: '14409-000',
            primary: true,
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        await updateAddressesUseCase.execute({
            uuid: '90140f51-2dd3-44f0-894a-aafb5c7c93ec',
            userUuid: '00eebae1-d24e-4089-bc2a-5779a71890a9',
            street: 'Rua da Paz',
            city: 'Franca',
            district: 'Centro',
            state: 'SP',
            number: 601,
            zipcode: '14403-000',
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        const address = await addressesRepository.findByUuid('90140f51-2dd3-44f0-894a-aafb5c7c93ec');
        expect(address?.street).toEqual('Rua da Paz');
    });


    it('should not be able to update a address with wrong uuid', async () => {
        await expect(() =>
            updateAddressesUseCase.execute({
                uuid: '413d7631-5f48-4ec6-845d-115205f02213',
                userUuid: '759cafaa-5461-4ba8-9342-d01635c66d66',
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
