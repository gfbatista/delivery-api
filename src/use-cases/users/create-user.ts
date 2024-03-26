import { UsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { hash } from 'bcryptjs';
import { AddressesRepository } from '@/repositories/addresses-repository';

interface CreateUserRequest {
    name: string
    email: string
    password: string
    address: {
        street: string
        city: string
        district: string
        state: string
        number?: number
        zipcode?: string
        latitude: number
        longitude: number
    }
}

export class CreateUserUseCase {
    constructor(private usersRepository: UsersRepository, private addressesRepository: AddressesRepository) { }

    async execute({ name, email, password, address }: CreateUserRequest) {
        const password_hash = await hash(password, 6);
        const { street, city, district, state, number, zipcode, latitude, longitude } = address;

        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password: password_hash,
        });

        await this.addressesRepository.create({
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

        return { user };
    }
}