import { OrdersRepository } from '@/repositories/orders-repository';
import { Order, OrderPaymentEnum, OrderStatusEnum } from '@prisma/client';

interface GetOrdersUseCaseResponse {
    orders: Order[]
}

export class GetAllOrdersByUserUseCase {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute(userId: number, payment: OrderPaymentEnum, status: OrderStatusEnum, page: number): Promise<GetOrdersUseCaseResponse> {
        const orders = await this.ordersRepository.findManyByUser(userId, payment, status, page);

        return { orders };
    }
}