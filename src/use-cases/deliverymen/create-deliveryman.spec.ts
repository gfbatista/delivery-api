import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryDeliverymenRepository } from '@/repositories/in-memory/in-memory-deliverymen-repository';
import { CreateDeliverymanUseCase } from './create-deliveryman';
import { DeliverymanAlreadyExistsError } from '../errors/deliveryman-already-exists-error';

let deliverymenRepository: InMemoryDeliverymenRepository;
let createDeliverymanUseCase: CreateDeliverymanUseCase;

describe('Create Deliveryman Use Case', () => {
    beforeEach(() => {
        deliverymenRepository = new InMemoryDeliverymenRepository();
        createDeliverymanUseCase = new CreateDeliverymanUseCase(deliverymenRepository);
    });

    it('should to create a deliveryman', async () => {
        const { deliveryman } = await createDeliverymanUseCase.execute({
            name: 'Gilberto Ferrari',
            driversLicense: '03968876809',
            company: 'Zap Entrega',
            phone: '16990000000',
            street: 'Rua Chile',
            city: 'Franca',
            district: 'Jardim Consolação',
            state: 'São Paulo',
            number: 501,
            zipcode: '14403-000'
        });

        expect(deliveryman.name).toEqual(expect.any(String));
        expect(deliveryman.driversLicense).toEqual(expect.any(String));
    });

    it('should to create a deliveryman without number and zipcode', async () => {
        const { deliveryman } = await createDeliverymanUseCase.execute({
            name: 'Gilberto Ferrari',
            driversLicense: '03968876809',
            company: 'Zap Entrega',
            phone: '16990000000',
            street: 'Rua Chile',
            city: 'Franca',
            district: 'Jardim Consolação',
            state: 'São Paulo'
        });

        expect(deliveryman.name).toEqual(expect.any(String));
        expect(deliveryman.driversLicense).toEqual(expect.any(String));
    });

    it('should not be able to create a deliveryman with same drivers license', async () => {
        await createDeliverymanUseCase.execute({
            name: 'Gilberto Ferrari',
            driversLicense: '03968876809',
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
            createDeliverymanUseCase.execute({
                name: 'José Alves',
                driversLicense: '03968876809',
                company: 'Particular',
                phone: '16990000100',
                street: 'Rua A',
                city: 'Franca',
                district: 'Centro',
                state: 'São Paulo',
                number: 500,
                zipcode: '14403-000'
            },)
        ).rejects.toBeInstanceOf(DeliverymanAlreadyExistsError);
    });
});
