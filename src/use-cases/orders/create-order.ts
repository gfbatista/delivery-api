import { AddressesRepository } from '@/repositories/addresses-repository';
import { OrdersRepository } from '@/repositories/orders-repository';
import { RestaurantsRepository } from '@/repositories/restaurants-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface CreateOrderRequest {
    user: {
        id: number
    },
    restaurant: {
        id: number
    },
    address: {
        id: number
    },
    total: number
}

export class CreateOrderUseCase {
    constructor(private ordersRepository: OrdersRepository, private addressesRepository: AddressesRepository, private restaurantsRepository: RestaurantsRepository) { }

    async execute({ user, restaurant, address, total }: CreateOrderRequest) {
        const restaurantFound = await this.restaurantsRepository.findById(restaurant.id);

        if (!restaurantFound) {
            throw new ResourceNotFoundError();
        }

        const addressesFound = await this.addressesRepository.findById(address.id);

        if (!addressesFound) {
            throw new ResourceNotFoundError();
        }

        const order = await this.ordersRepository.create({
            userId: user.id,
            addressId: address.id,
            restaurantId: restaurant.id,
            total,
        });

        return { order };
    }
}