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
        const [restaurantFound, addressesFound, orderFound] = await Promise.all([
            this.restaurantsRepository.findById(restaurant.id),
            this.addressesRepository.findById(address.id),
            this.ordersRepository.findByUuid(uuid),
        ]);

        if (!restaurantFound || !addressesFound || !orderFound) {
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