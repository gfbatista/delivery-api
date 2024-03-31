import { describe, it, beforeEach, expect } from 'vitest';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UpdatePrimaryAddressUseCase } from './update-primary-address';

let addressesRepository: InMemoryAddressesRepository;
let usersRepository: InMemoryUsersRepository;
let updatePrimaryAddressUseCase: UpdatePrimaryAddressUseCase;

describe('Update Primary Address Use Case', () => {
    beforeEach(() => {
        addressesRepository = new InMemoryAddressesRepository();
        usersRepository = new InMemoryUsersRepository();
        updatePrimaryAddressUseCase = new UpdatePrimaryAddressUseCase(addressesRepository);
    });

    it('should to update a user address to primary (false)', async () => {
        await usersRepository.create({
            uuid: '00eebae1-d24e-4089-bc2a-5779a71890a9',
            name: 'Gilberto Ferrari',
            email: 'gilberto@email.com',
            password: '99A29DC8105FD2FA39D8CDC04733938D'
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


        await updatePrimaryAddressUseCase.execute({
            uuid: '90140f51-2dd3-44f0-894a-aafb5c7c93ec',
            primary: false
        });

        const address = await addressesRepository.findByUuid('90140f51-2dd3-44f0-894a-aafb5c7c93ec');
        expect(address?.primary).toEqual(false);
    });


    it('should not be able to update a user address to primary (false)', async () => {
        await expect(() =>
            updatePrimaryAddressUseCase.execute({
                uuid: '90140f51-2dd3-44f0-894a-aafb5c7c93dd',
                primary: false
            },)
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
