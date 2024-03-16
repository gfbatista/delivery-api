import { DeliverymenRepository } from '@/repositories/deliverymen-repository';
import { Deliveryman } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetDeliverymanProfileUseCaseRequest {
  deliverymanUuid: string
}

interface GetDeliverymanProfileUseCaseResponse {
  deliveryman: Deliveryman
}

export class GetDeliverymanProfileUseCase {
    constructor(private deliverymenRepository: DeliverymenRepository) { }

    async execute({
        deliverymanUuid,
    }: GetDeliverymanProfileUseCaseRequest): Promise<GetDeliverymanProfileUseCaseResponse> {
        const deliveryman = await this.deliverymenRepository.findByUuid(deliverymanUuid);

        if (!deliveryman) {
            throw new ResourceNotFoundError();
        }

        return { deliveryman };
    }
}
