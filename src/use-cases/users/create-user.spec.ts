import { expect, describe, it, beforeEach } from 'vitest';
import { CreateUserUseCase } from './create-user';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('Create User Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        createUserUseCase = new CreateUserUseCase(usersRepository);
    });

    it('should to create a user', async () => {
        const { user } = await createUserUseCase.execute({
            name: 'Gilberto Ferrari',
            email: 'gilberto@email.com',
            password: '99A29DC8105FD2FA39D8CDC04733938D',
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        expect(user.name).toEqual(expect.any(String));
        expect(user.email).toEqual(expect.any(String));
        expect(user.password).toEqual(expect.any(String));
    });
});
