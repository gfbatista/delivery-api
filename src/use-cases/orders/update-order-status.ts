import { OrderStatusEnum } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { OrdersRepository } from '@/repositories/orders-repository';

interface UpdateOrderStatusRequest {
    uuid: string
    orderStatus: OrderStatusEnum
}

export class UpdateOrderStatusUseCase {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute({ uuid, orderStatus }: UpdateOrderStatusRequest) {
        const order = await this.ordersRepository.findByUuid(uuid);

        if (!order) {
            throw new ResourceNotFoundError();
        }

        await this.ordersRepository.updateOrderStatus(uuid, orderStatus);
    }
}