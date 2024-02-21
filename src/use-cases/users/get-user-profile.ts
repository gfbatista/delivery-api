import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetUserProfileUseCaseRequest {
  userId: number
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
    constructor(private userRepository: UsersRepository) {}

    async execute({
        userId,
    }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.userRepository.findById(Number(userId));

        if (!user) {
            throw new ResourceNotFoundError();
        }

        return { user };
    }
}
