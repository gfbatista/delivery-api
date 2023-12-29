import { describe, it, beforeEach, expect } from 'vitest';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryDeliverymenRepository } from '@/repositories/in-memory/in-memory-deliverymen-repository';
import { UpdateDeliverymanUseCase } from './update-deliveryman';
import { DeliverymanAlreadyExistsError } from '../errors/deliveryman-already-exists-error';

let deliverymenRepository: InMemoryDeliverymenRepository;
let updateDeliverymanUseCase: UpdateDeliverymanUseCase;

describe('Update Deliveryman Use Case', () => {
    beforeEach(() => {
        deliverymenRepository = new InMemoryDeliverymenRepository();
        updateDeliverymanUseCase = new UpdateDeliverymanUseCase(deliverymenRepository);
    });

    it('should to update a deliveryman', async () => {
        await deliverymenRepository.create({
            uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94',
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

        await updateDeliverymanUseCase.execute({
            uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94',
            name: 'Gilberto Batista',
            driversLicense: '03968876810',
            company: 'Particular',
            phone: '16990000000',
            street: 'Rua São Paulo',
            city: 'Franca',
            district: 'Jardim Consolação',
            state: 'São Paulo',
            number: 601,
            zipcode: '14410-000'
        },);
    });

    it('should not be able to update a deliveryman with wrong uuid', async () => {
        await expect(() =>
            updateDeliverymanUseCase.execute({
                uuid: '8c8c48e3-1ea9-40db-9de0-7a90c146b4f9',
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
            },)
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it('should not be able to update a deliveryman with existing driving license', async () => {
        await deliverymenRepository.create({
            uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94',
            name: 'José Silva',
            driversLicense: '03968876809',
            company: 'Zé Entrega',
            phone: '16990000456',
            street: 'Rua do Sol',
            city: 'Franca',
            district: 'Centro',
            state: 'São Paulo',
            number: 999,
            zipcode: '14403-000'
        });

        await deliverymenRepository.create({
            uuid: '8c8c48e3-1ea9-40db-9de0-7a90c146b4f9',
            name: 'Gilberto Ferrari',
            driversLicense: '03968876877',
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
            updateDeliverymanUseCase.execute({
                uuid: '8c8c48e3-1ea9-40db-9de0-7a90c146b4f9',
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
            },)
        ).rejects.toBeInstanceOf(DeliverymanAlreadyExistsError);
    });
});
