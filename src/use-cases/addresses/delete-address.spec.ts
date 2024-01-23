import { expect, describe, it, beforeEach } from 'vitest';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository';
import { DeleteAddressUseCase } from './delete-address';
import { AddressCannotBeDeletedError } from '../errors/address-cannot-be-deleted-error';

let addressesRepository: InMemoryAddressesRepository;
let deleteAddressUseCase: DeleteAddressUseCase;

describe('Delete Address Use Case', async () => {
    beforeEach(() => {
        addressesRepository = new InMemoryAddressesRepository();
        deleteAddressUseCase = new DeleteAddressUseCase(addressesRepository);
    });

    it('should be able to delete a address', async () => {
        await addressesRepository.create({
            uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94',
            userId: 1,
            street: 'Rua II',
            city: 'Franca',
            district: 'Centro',
            state: 'SP',
            primary: false,
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        await deleteAddressUseCase.execute({ uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94' });

        const address = await addressesRepository.findByUuid('00a860ab-eea8-4278-a7e2-450ddb82ea94');
        expect(address?.deletedAt).toEqual(expect.any(Date));
    });

    it('should not be able to delete a address with wrong uuid', async () => {
        await expect(() =>
            deleteAddressUseCase.execute({ uuid: '433a4fb5-92fa-4b6d-96ba-cb99d2909d8e' }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it('should not be able to delete a primary address', async () => {
        await addressesRepository.create({
            uuid: '1f728969-9951-4d12-9a43-0d446bbfb1fd',
            userId: 1,
            street: 'Rua II',
            city: 'Franca',
            district: 'Centro',
            state: 'SP',
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        await expect(() =>
            deleteAddressUseCase.execute({ uuid: '1f728969-9951-4d12-9a43-0d446bbfb1fd' }),
        ).rejects.toBeInstanceOf(AddressCannotBeDeletedError);
    });
});
