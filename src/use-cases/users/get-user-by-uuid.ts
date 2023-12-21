import { User } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { UsersRepository } from '@/repositories/users-repository';

interface GetUserByUuidUseCaseRequest {
    uuid: string
  }

export class GetUserByUuidUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({ uuid } : GetUserByUuidUseCaseRequest): Promise<User | null> {
        const user = await this.usersRepository.findByUuid(uuid);

        if (!user){
            throw new ResourceNotFoundError();
        }

        return user;
    }
}