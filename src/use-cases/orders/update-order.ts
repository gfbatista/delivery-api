import { OrdersRepository } from '@/repositories/orders-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { AddressesRepository } from '@/repositories/addresses-repository';
import { RestaurantsRepository } from '@/repositories/restaurants-repository';

interface UpdateOrderRequest {
    uuid: string
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

export class UpdateOrderUseCase {
    constructor(private ordersRepository: OrdersRepository, private addressesRepository: AddressesRepository, private restaurantsRepository: RestaurantsRepository) { }

    async execute({ uuid, user, restaurant, address, total }: UpdateOrderRequest) {
        const restaurantFound = await this.restaurantsRepository.findById(restaurant.id);

        if (!restaurantFound) {
            throw new ResourceNotFoundError();
        }

        const addressesFound = await this.addressesRepository.findById(address.id);

        if (!addressesFound) {
            throw new ResourceNotFoundError();
        }

        const orderFound = await this.ordersRepository.findByUuid(uuid);

        if (!orderFound) {
            throw new ResourceNotFoundError();
        }

        await this.ordersRepository.save({
            uuid,
            userId: user.id,
            addressId: address.id,
            restaurantId: restaurant.id,
            total,
        }, uuid);
    }
}