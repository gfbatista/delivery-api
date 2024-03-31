import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { hash } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';
import { GetUserProfileUseCase } from './get-user-profile';

let usersRepository: InMemoryUsersRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
    });

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            name: 'Gilberto Ferrari',
            email: 'giba@example.com',
            password: await hash('123456', 6)
        });

        const { user } = await getUserProfileUseCase.execute({
            userId: createdUser.id,
        });

        expect(user.name).toEqual('Gilberto Ferrari');
    });

    it('should not be able to get user profile with wrong id', async () => {
        await expect(() =>
            getUserProfileUseCase.execute({
                userId: 1,
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
