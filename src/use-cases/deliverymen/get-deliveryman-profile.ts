import { DeliverymenRepository } from '@/repositories/deliverymen-repository';
import { Deliveryman } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetDeliverymanProfileUseCaseRequest {
  deliverymanId: number
}

interface GetDeliverymanProfileUseCaseResponse {
  deliveryman: Deliveryman
}

export class GetDeliverymanProfileUseCase {
    constructor(private deliverymenRepository: DeliverymenRepository) { }

    async execute({
        deliverymanId,
    }: GetDeliverymanProfileUseCaseRequest): Promise<GetDeliverymanProfileUseCaseResponse> {
        const deliveryman = await this.deliverymenRepository.findById(deliverymanId);

        if (!deliveryman) {
            throw new ResourceNotFoundError();
        }

        return { deliveryman };
    }
}
