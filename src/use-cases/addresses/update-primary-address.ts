import { AddressesRepository } from '@/repositories/addresses-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface UpdatePrimaryAddressRequest {
    uuid: string
    primary: boolean
}

export class UpdatePrimaryAddressUseCase {
    constructor(private addressesRepository: AddressesRepository) { }

    async execute({ uuid, primary }: UpdatePrimaryAddressRequest) {
        const address = await this.addressesRepository.findByUuid(uuid);

        if (!address) {
            throw new ResourceNotFoundError();
        }

        await this.addressesRepository.updatePrimaryAddress(uuid, primary);
    }
}