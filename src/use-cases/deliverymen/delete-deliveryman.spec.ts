import { expect, describe, it, beforeEach } from 'vitest';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryDeliverymenRepository } from '@/repositories/in-memory/in-memory-deliverymen-repository';
import { DeleteDeliverymanUseCase } from './delete-deliveryman';

let deliverymenRepository: InMemoryDeliverymenRepository;
let deleteDeliverymanUseCase: DeleteDeliverymanUseCase;

describe('Delete Deliveryman Use Case', () => {
    beforeEach(() => {
        deliverymenRepository = new InMemoryDeliverymenRepository();
        deleteDeliverymanUseCase = new DeleteDeliverymanUseCase(deliverymenRepository);
    });

    it('should be able to delete a deliveryman', async () => {
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

        await deleteDeliverymanUseCase.execute({ uuid: '00a860ab-eea8-4278-a7e2-450ddb82ea94' });
    });

    it('should not be able to delete a deliveryman with wrong uuid', async () => {
        await expect(() =>
            deleteDeliverymanUseCase.execute({ uuid: '433a4fb5-92fa-4b6d-96ba-cb99d2909d8e' }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
