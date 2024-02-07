import { AddressesRepository } from '@/repositories/addresses-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { UsersRepository } from '@/repositories/users-repository';

interface UpdateAddressRequest {
    uuid: string
    userUuid: string,
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
    constructor(private addressesRepository: AddressesRepository, private usersRepository: UsersRepository) { }

    async execute({ uuid, userUuid, street, city, district, state, number, zipcode, latitude, longitude }: UpdateAddressRequest) {
        const address = await this.addressesRepository.findByUuid(uuid);

        if (!address) {
            throw new ResourceNotFoundError();
        }

        const user = await this.usersRepository.findByUuid(userUuid);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        await this.addressesRepository.save({
            userId: user.id,
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