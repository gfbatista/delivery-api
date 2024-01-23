import { Address } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { AddressesRepository } from '@/repositories/addresses-repository';

interface GetAddressByUuidUseCaseRequest {
    uuid: string
  }

export class GetAddressByUuidUseCase {
    constructor(private addressesRepository: AddressesRepository) { }

    async execute({ uuid } : GetAddressByUuidUseCaseRequest): Promise<Address | null> {
        const address = await this.addressesRepository.findByUuid(uuid);

        if (!address){
            throw new ResourceNotFoundError();
        }

        return address;
    }
}