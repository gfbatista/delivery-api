import { expect, describe, it, beforeEach } from 'vitest';
import { CreateUserUseCase } from './create-user';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository';

let usersRepository: InMemoryUsersRepository;
let addressesRepository: InMemoryAddressesRepository;
let createUserUseCase: CreateUserUseCase;

describe('Create User Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        addressesRepository = new InMemoryAddressesRepository();
        createUserUseCase = new CreateUserUseCase(usersRepository, addressesRepository);
    });

    it('should to create a user', async () => {
        const { user } = await createUserUseCase.execute({
            name: 'Gilberto Ferrari',
            email: 'gilberto@email.com',
            password: '99A29DC8105FD2FA39D8CDC04733938D',
            address: {
                street: 'Rua da Esperança',
                city: 'Franca',
                district: 'Parque Castelo',
                state: 'SP',
                number: 601,
                zipcode: '14403-000',
                latitude: -21.0460305,
                longitude: -47.6808633
            }
        });

        expect(user.name).toEqual(expect.any(String));
        expect(user.email).toEqual(expect.any(String));
        expect(user.password).toEqual(expect.any(String));
    });

    it('should not be able to create a user with same e-mail', async () => {
        await createUserUseCase.execute({
            name: 'Gilberto Ferrari',
            email: 'gilberto@email.com',
            password: '99A29DC8105FD2FA39D8CDC04733938D',
            address: {
                street: 'Rua da Esperança',
                city: 'Franca',
                district: 'Parque Castelo',
                state: 'SP',
                number: 601,
                zipcode: '14403-000',
                latitude: -21.0460305,
                longitude: -47.6808633
            }
        });

        await expect(() =>
            createUserUseCase.execute({
                name: 'Gilberto Batista',
                email: 'gilberto@email.com',
                password: '99A29DC8105FD2FA39D8CDC04733938D',
                address: {
                    street: 'Rua da Esperança',
                    city: 'Franca',
                    district: 'Parque Castelo',
                    state: 'SP',
                    number: 601,
                    zipcode: '14403-000',
                    latitude: -21.0460305,
                    longitude: -47.6808633
                }
            },)
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});
