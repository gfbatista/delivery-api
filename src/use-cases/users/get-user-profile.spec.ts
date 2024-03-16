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
            password: await hash('123456', 6),
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        const { user } = await getUserProfileUseCase.execute({
            userUuid: createdUser.uuid,
        });

        expect(user.name).toEqual('Gilberto Ferrari');
    });

    it('should not be able to get user profile with wrong id', async () => {
        await expect(() =>
            getUserProfileUseCase.execute({
                userUuid: '8598136d-53f7-48eb-a79f-aa27705a84b3',
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
