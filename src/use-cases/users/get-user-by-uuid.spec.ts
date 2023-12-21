import { expect, describe, it, beforeEach } from 'vitest';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { GetUserByUuidUseCase } from './get-user-by-uuid';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository;
let getUserByUuidUseCase: GetUserByUuidUseCase;

describe('Get User by Uuid Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        getUserByUuidUseCase = new GetUserByUuidUseCase(usersRepository);
    });

    it('should be able to get user by uuid', async () => {
        await usersRepository.create({
            uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94',
            name: 'Gilberto Ferrari',
            email: 'gilberto@email.com',
            password: '99A29DC8105FD2FA39D8CDC04733938D',
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        const user = await getUserByUuidUseCase.execute({ uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94' });

        expect(user?.uuid).toEqual('00a860ab-eea8-4278-a7e2-450ddb82ea94');
    });

    it('should not be able to get user with wrong uuid', async () => {
        await expect(() =>
            getUserByUuidUseCase.execute({ uuid: '433a4fb5-92fa-4b6d-96ba-cb99d2909d8e' }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
