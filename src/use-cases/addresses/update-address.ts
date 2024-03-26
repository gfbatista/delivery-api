import { AddressesRepository } from '@/repositories/addresses-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface UpdateAddressRequest {
    uuid: string
    userId: number,
    street: string
    city: string
    district: string
    state: string
    number?: number
    zipcode?: string
    latitude: number
    longitude: number
}

export class UpdateAddressUseCase {
    constructor(private addressesRepository: AddressesRepository) { }

    async execute({ uuid, userId, street, city, district, state, number, zipcode, latitude, longitude }: UpdateAddressRequest) {
        const address = await this.addressesRepository.findByUuid(uuid);

        if (!address) {
            throw new ResourceNotFoundError();
        }

        await this.addressesRepository.save({
            userId,
            uuid,
            street,
            city,
            district,
            state,
            number,
            zipcode,
            latitude,
            longitude,
        }, uuid);
    }
}