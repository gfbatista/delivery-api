import { UsersRepository } from '@/repositories/users-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { AddressesRepository } from '@/repositories/addresses-repository';

interface CreateAddressRequest {
    uuid: string
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
    constructor(private addressesRepository: AddressesRepository, private usersRepository: UsersRepository) { }

    async execute({ street, city, district, state, number, zipcode, latitude, longitude, uuid }: CreateAddressRequest) {

        const user = await this.usersRepository.findByUuid(uuid);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        await this.addressesRepository.updatePrimaryAddressToFalse(user.id);

        const address = await this.addressesRepository.create({
            street,
            city,
            district,
            state,
            number,
            zipcode,
            latitude,
            longitude,
            userId: user.id
        });

        return { address };
    }
}