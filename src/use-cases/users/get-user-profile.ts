import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetUserProfileUseCaseRequest {
  userUuid: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
    constructor(private userRepository: UsersRepository) {}

    async execute({
        userUuid,
    }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.userRepository.findByUuid(userUuid);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        return { user };
    }
}
