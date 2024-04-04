import { OrdersRepository } from '@/repositories/orders-repository';
import { Order } from '@prisma/client';

interface GetOrdersUseCaseResponse {
    orders: Order[]
}

export class GetAllOrdersByUserUseCase {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute(userId: number, page: number): Promise<GetOrdersUseCaseResponse> {
        const orders = await this.ordersRepository.findManyByUser(userId, page);

        return { orders };
    }
}