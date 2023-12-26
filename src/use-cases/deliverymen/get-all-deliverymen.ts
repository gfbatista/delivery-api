import { DeliverymenRepository } from '@/repositories/deliverymen-repository';
import { Deliveryman } from '@prisma/client';

interface GetDeliverymenUseCaseResponse {
    deliverymen: Deliveryman[]
}

export class GetAllDeliverymenUseCase {
    constructor(private deliverymenRepository: DeliverymenRepository) { }

    async execute(page: number): Promise<GetDeliverymenUseCaseResponse> {
        const deliverymen = await this.deliverymenRepository.findMany(page);

        return { deliverymen };
    }
}