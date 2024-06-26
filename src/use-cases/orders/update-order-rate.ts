import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { OrdersRepository } from '@/repositories/orders-repository';

interface UpdateOrderRateRequest {
    uuid: string
    rate: number
}

export class UpdateOrderRateUseCase {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute({ uuid, rate }: UpdateOrderRateRequest) {
        const order = await this.ordersRepository.findByUuid(uuid);

        if (!order) {
            throw new ResourceNotFoundError();
        }

        await this.ordersRepository.updateOrderRate(uuid, rate);
    }
}