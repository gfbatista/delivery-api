import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface GetUsersUseCaseResponse {
    users: User[]
}

export class GetAllUsersUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute(page: number): Promise<GetUsersUseCaseResponse> {
        const users = await this.usersRepository.findMany(page);

        return { users };
    }
}