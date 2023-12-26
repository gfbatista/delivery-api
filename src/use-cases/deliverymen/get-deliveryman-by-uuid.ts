import { Deliveryman } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { DeliverymenRepository } from '@/repositories/deliverymen-repository';

interface GetDeliverymanByUuidUseCaseRequest {
    uuid: string
  }

export class GetDeliverymanByUuidUseCase {
    constructor(private deliverymenRepository: DeliverymenRepository) { }

    async execute({ uuid } : GetDeliverymanByUuidUseCaseRequest): Promise<Deliveryman | null> {
        const deliveryman = await this.deliverymenRepository.findByUuid(uuid);

        if (!deliveryman){
            throw new ResourceNotFoundError();
        }

        return deliveryman;
    }
}