import { describe, it, beforeEach, expect } from 'vitest';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UpdateUserUseCase } from './update-user';

let usersRepository: InMemoryUsersRepository;
let updateUserUseCase: UpdateUserUseCase;

describe('Update User Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        updateUserUseCase = new UpdateUserUseCase(usersRepository);
    });

    it('should to update a user', async () => {
        await usersRepository.create({
            uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94',
            name: 'Gilberto Ferrari',
            email: 'gilberto@email.com',
            password: '99A29DC8105FD2FA39D8CDC04733938D',
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        await updateUserUseCase.execute({
            uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94',
            name: 'Gilberto Batista',
            email: 'gilbertobatista@email.com',
            password: '99A29DC8105FD2FA39D8CDC04733938D',
            latitude: -21.0460305,
            longitude: -47.6808633
        },);
    });

    it('should not be able to update a user with wrong uuid', async () => {
        await expect(() =>
            updateUserUseCase.execute({
                uuid: '8c8c48e3-1ea9-40db-9de0-7a90c146b4f9',
                name: 'Gilberto Batista',
                email: 'gilbertobatista@email.com',
                password: '99A29DC8105FD2FA39D8CDC04733938D',
                latitude: -21.0460305,
                longitude: -47.6808633
            },)
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
