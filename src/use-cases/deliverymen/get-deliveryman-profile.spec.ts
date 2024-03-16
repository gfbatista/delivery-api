import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { expect, describe, it, beforeEach } from 'vitest';
import { GetDeliverymanProfileUseCase } from './get-deliveryman-profile';
import { InMemoryDeliverymenRepository } from '@/repositories/in-memory/in-memory-deliverymen-repository';
import { hash } from 'bcryptjs';

let deliverymenRepository: InMemoryDeliverymenRepository;
let getDeliverymanProfileUseCase: GetDeliverymanProfileUseCase;

describe('Get Deliveryman Profile Use Case', () => {
    beforeEach(() => {
        deliverymenRepository = new InMemoryDeliverymenRepository();
        getDeliverymanProfileUseCase = new GetDeliverymanProfileUseCase(deliverymenRepository);
    });

    it('should be able to get deliveryman profile', async () => {
        const createdDeliveryman = await deliverymenRepository.create({
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

        const { deliveryman } = await getDeliverymanProfileUseCase.execute({
            deliverymanUuid: createdDeliveryman.uuid,
        });

        expect(deliveryman.name).toEqual('Gilberto Ferrari');
    });

    it('should not be able to get deliveryman profile with wrong id', async () => {
        await expect(() =>
            getDeliverymanProfileUseCase.execute({
                deliverymanUuid: '8598136d-53f7-48eb-a79f-aa27705a84b3',
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
