import { UsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { hash } from 'bcryptjs';

interface CreateUserRequest {
    name: string
    email: string
    password: string
    latitude: number
    longitude: number
}

export class CreateUserUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({ name, email, latitude, longitude, password }: CreateUserRequest) {
        const password_hash = await hash(password, 6);

        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        const user = await this.usersRepository.create({
            name,
            email,
            latitude,
            longitude,
            password: password_hash
        });

        return { user };
    }
}