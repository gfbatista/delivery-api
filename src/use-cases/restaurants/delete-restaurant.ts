import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { RestaurantsRepository } from '@/repositories/restaurants-repository';

interface DeleteRestaurantUseCaseRequest {
    uuid: string
}

export class DeleteRestaurantUseCase {
    constructor(private restaurantsRepository: RestaurantsRepository) { }

    async execute({ uuid }: DeleteRestaurantUseCaseRequest): Promise<void> {
        const restaurant = await this.restaurantsRepository.findByUuid(uuid);

        if (!restaurant) {
            throw new ResourceNotFoundError();
        }

        restaurant.deletedAt = new Date();
        this.restaurantsRepository.delete(restaurant);
    }
}