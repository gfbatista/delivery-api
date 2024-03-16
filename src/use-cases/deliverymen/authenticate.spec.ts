import { expect, describe, it, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { AuthenticateUseCase } from './authenticate';
import { InMemoryDeliverymenRepository } from '@/repositories/in-memory/in-memory-deliverymen-repository';

let deliverymenRepository: InMemoryDeliverymenRepository;
let authenticateUseCase: AuthenticateUseCase;

describe('Authenticate Deliveryman', () => {
    beforeEach(() => {
        deliverymenRepository = new InMemoryDeliverymenRepository();
        authenticateUseCase = new AuthenticateUseCase(deliverymenRepository);
    });

    it('should be able to authenticate', async () => {
        await deliverymenRepository.create({
            name: 'Gilberto Ferrari',
            driversLicense: '03968876809',
            password: await hash('123456', 6),
            company: 'Zap Entrega',
            phone: '16990000000',
            street: 'Rua Chile',
            city: 'Franca',
            district: 'Jardim Consolação',
            state: 'São Paulo',
            number: 501,
            zipcode: '14403-000'
        });

        const { deliveryman } = await authenticateUseCase.execute({
            driversLicense: '03968876809',
            password: '123456',
        });

        expect(deliveryman.id).toEqual(expect.any(Number));
    });

    it('should not be able to authenticate with wrong driversLicense', async () => {
        await expect(() =>
            authenticateUseCase.execute({
                driversLicense: '9999999999',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        await deliverymenRepository.create({
            name: 'Gilberto Ferrari',
            driversLicense: '03968876809',
            password: await hash('123456', 6),
            company: 'Zap Entrega',
            phone: '16990000000',
            street: 'Rua Chile',
            city: 'Franca',
            district: 'Jardim Consolação',
            state: 'São Paulo',
            number: 501,
            zipcode: '14403-000'
        });

        await expect(() =>
            authenticateUseCase.execute({
                driversLicense: '03968876809',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
