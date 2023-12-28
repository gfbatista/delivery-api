import { DeliverymenRepository } from '@/repositories/deliverymen-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetDeliverymanByUuidUseCaseRequest {
    uuid: string
}

export class DeleteDeliverymanUseCase {
    constructor(private deliverymenRepository: DeliverymenRepository) { }

    async execute({ uuid }: GetDeliverymanByUuidUseCaseRequest): Promise<void> {
        const deliveryman = await this.deliverymenRepository.findByUuid(uuid);

        if (!deliveryman) {
            throw new ResourceNotFoundError();
        }

        deliveryman.deletedAt = new Date();
        this.deliverymenRepository.delete(deliveryman);
    }
}