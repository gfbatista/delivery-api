import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';

let usersRepository: InMemoryUsersRepository;
let authenticateUseCase: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        authenticateUseCase = new AuthenticateUseCase(usersRepository);
    });

    it('should be able to authenticate', async () => {
        await usersRepository.create({
            name: 'Gilberto Ferrari',
            email: 'gilberto@email.com',
            password: await hash('123456', 6),
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        const { user } = await authenticateUseCase.execute({
            email: 'gilberto@email.com',
            password: '123456',
        });

        expect(user.id).toEqual(expect.any(Number));
    });

    it('should not be able to authenticate with wrong email', async () => {
        await expect(() =>
            authenticateUseCase.execute({
                email: 'giba@example.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            name: 'Gilberto Ferrari',
            email: 'giba@example.com',
            password: await hash('123456', 6),
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        await expect(() =>
            authenticateUseCase.execute({
                email: 'giba@example.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
