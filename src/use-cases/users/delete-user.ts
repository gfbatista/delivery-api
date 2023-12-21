import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { UsersRepository } from '@/repositories/users-repository';

interface GetUserByUuidUseCaseRequest {
    uuid: string
  }

export class DeleteUserUseCase {
    constructor(private userRepository: UsersRepository) { }

    async execute({ uuid } : GetUserByUuidUseCaseRequest): Promise<void> {
        const user = await this.userRepository.findByUuid(uuid);

        if (!user){
            throw new ResourceNotFoundError();
        }

        user.deletedAt = new Date();
        this.userRepository.delete(user);
    }
}