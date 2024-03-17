import { AddressesRepository } from '@/repositories/addresses-repository';

interface CreateAddressRequest {
    userId: number
    street: string
    city: string
    district: string
    state: string
    number?: number
    zipcode?: string
    latitude: number
    longitude: number
}

export class CreateAddressUseCase {
    constructor(private addressesRepository: AddressesRepository) { }

    async execute({ street, city, district, state, number, zipcode, latitude, longitude, userId }: CreateAddressRequest) {

        await this.addressesRepository.updatePrimaryAddressToFalse(userId);

        const address = await this.addressesRepository.create({
            street,
            city,
            district,
            state,
            number,
            zipcode,
            latitude,
            longitude,
            userId
        });

        return { address };
    }
}