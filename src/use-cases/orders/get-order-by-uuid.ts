import { OrdersRepository } from '@/repositories/orders-repository';
import { Order } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetOrderByUuidUseCaseRequest {
    uuid: string
  }

export class GetOrderByUuidUseCase {
    constructor(private ordersRepository: OrdersRepository) { }

    async execute({ uuid } : GetOrderByUuidUseCaseRequest): Promise<Order | null> {
        const order = await this.ordersRepository.findByUuid(uuid);

        if (!order){
            throw new ResourceNotFoundError();
        }

        return order;
    }
}