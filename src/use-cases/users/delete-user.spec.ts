import { expect, describe, it, beforeEach } from 'vitest';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { DeleteUserUseCase } from './delete-user';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository;
let deleteUserUseCase: DeleteUserUseCase;

describe('Delete User Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        deleteUserUseCase = new DeleteUserUseCase(usersRepository);
    });

    it('should be able to delete a user', async () => {
        await usersRepository.create({
            uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94',
            name: 'Gilberto Ferrari',
            email: 'gilberto@email.com',
            password: '99A29DC8105FD2FA39D8CDC04733938D',
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        await deleteUserUseCase.execute({ uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94' });
    });

    it('should not be able to delete a user with wrong uuid', async () => {
        await expect(() =>
            deleteUserUseCase.execute({ uuid: '433a4fb5-92fa-4b6d-96ba-cb99d2909d8e' }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
