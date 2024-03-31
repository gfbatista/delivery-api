import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { UsersRepository } from '@/repositories/users-repository';

interface UpdateUserRequest {
    uuid: string,
    name: string
    email: string
    password: string
}

export class UpdateUserUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({ uuid, name, email, password }: UpdateUserRequest) {
        const user = await this.usersRepository.findByUuid(uuid);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        await this.usersRepository.save({
            name, 
            email, 
            password,
        }, uuid);
    }
}