import { OrderPaymentEnum } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { OrdersRepository } from '@/repositories/orders-repository';

interface UpdateOrderPaymentRequest {
    uuid: string
    orderPayment: OrderPaymentEnum
}

export class UpdateOrderPaymentUseCase {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute({ uuid, orderPayment}: UpdateOrderPaymentRequest) {
        const order = await this.ordersRepository.findByUuid(uuid);

        if (!order) {
            throw new ResourceNotFoundError();
        }

        await this.ordersRepository.updateOrderPayment(uuid, orderPayment);
    }
}