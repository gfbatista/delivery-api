import { AddressesRepository } from '@/repositories/addresses-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { AddressCannotBeDeletedError } from '../errors/address-cannot-be-deleted-error';

interface GetUserByUuidUseCaseRequest {
    uuid: string
  }

export class DeleteAddressUseCase {
    constructor(private addressesRepository: AddressesRepository) { }

    async execute({ uuid } : GetUserByUuidUseCaseRequest): Promise<void> {
        const address = await this.addressesRepository.findByUuid(uuid);

        if (!address){
            throw new ResourceNotFoundError();
        }

        if (address.primary){
            throw new AddressCannotBeDeletedError();
        }

        address.deletedAt = new Date();
        this.addressesRepository.delete(address);
    }
}