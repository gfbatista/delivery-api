import { expect, describe, it, beforeEach } from 'vitest';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository';
import { GetAddressByUuidUseCase } from './get-address-by-uuid';

let addressesRepository: InMemoryAddressesRepository;
let getAddressByUuidUseCase: GetAddressByUuidUseCase;

describe('Get Address by Uuid Use Case', () => {
    beforeEach(() => {
        addressesRepository = new InMemoryAddressesRepository();
        getAddressByUuidUseCase = new GetAddressByUuidUseCase(addressesRepository);
    });

    it('should be able to get address by uuid', async () => {
        await addressesRepository.create({
            uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94',
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

        const address = await getAddressByUuidUseCase.execute({ uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94' });

        expect(address?.uuid).toEqual('00a860ab-eea8-4278-a7e2-450ddb82ea94');
    });

    it('should not be able to get address with wrong uuid', async () => {
        await expect(() =>
            getAddressByUuidUseCase.execute({ uuid: '433a4fb5-92fa-4b6d-96ba-cb99d2909d8e' }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
