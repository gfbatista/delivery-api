import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { UsersRepository } from '@/repositories/users-repository';

interface GetUserByUuidUseCaseRequest {
    uuid: string
  }

export class DeleteUserUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({ uuid } : GetUserByUuidUseCaseRequest): Promise<void> {
        const user = await this.usersRepository.findByUuid(uuid);

        if (!user){
            throw new ResourceNotFoundError();
        }

        user.deletedAt = new Date();
        this.usersRepository.delete(user);
    }
}