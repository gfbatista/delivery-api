import { OrdersRepository } from '@/repositories/orders-repository';
import { Order } from '@prisma/client';

interface GetOrdersByDeliverymanUseCaseResponse {
    orders: Order[]
}

export class GetAllOrdersByDeliverymanUseCase {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute(deliverymanId: number, page: number): Promise<GetOrdersByDeliverymanUseCaseResponse> {
        const orders = await this.ordersRepository.findManyByDeliveryman(deliverymanId, page);

        return { orders };
    }
}