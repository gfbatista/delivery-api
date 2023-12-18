import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { GetAllUsersUseCase } from './get-all-users';

let usersRepository: InMemoryUsersRepository;
let getAllUsersUseCase: GetAllUsersUseCase;

describe('Get all Users Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        getAllUsersUseCase = new GetAllUsersUseCase(usersRepository);
    });

    it('should be able to get all users', async () => {
        await usersRepository.create({
            name: 'Gilberto Ferrari',
            email: 'gilberto@email.com',
            password: '99A29DC8105FD2FA39D8CDC04733938D',
            latitude: -21.0460305,
            longitude: -47.6808633
        });

        const { users } = await getAllUsersUseCase.execute();

        expect(users).toHaveLength(1);
        expect(users).toEqual([expect.objectContaining({ name: 'Gilberto Ferrari' })]);
    });
});
