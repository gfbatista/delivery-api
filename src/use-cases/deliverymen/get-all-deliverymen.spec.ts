import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryDeliverymenRepository } from '@/repositories/in-memory/in-memory-deliverymen-repository';
import { GetAllDeliverymenUseCase } from './get-all-deliverymen';

let deliverymenRepository: InMemoryDeliverymenRepository;
let getAllDeliverymenUseCase: GetAllDeliverymenUseCase;

describe('Get all Deliverymen Use Case', () => {
    beforeEach(() => {
        deliverymenRepository = new InMemoryDeliverymenRepository();
        getAllDeliverymenUseCase = new GetAllDeliverymenUseCase(deliverymenRepository);
    });

    it('should be able to get all deliverymen', async () => {
        await deliverymenRepository.create({
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

        const { deliverymen } = await getAllDeliverymenUseCase.execute(1);

        expect(deliverymen).toHaveLength(1);
        expect(deliverymen).toEqual([expect.objectContaining({ name: 'Gilberto Ferrari' })]);
    });
});
