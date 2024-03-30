import { Restaurant } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { RestaurantsRepository } from '@/repositories/restaurants-repository';

interface GetRestaurantByUuidUseCaseRequest {
    uuid: string
}

export class GetRestaurantByUuidUseCase {
    constructor(private restaurantsRepository: RestaurantsRepository) { }

    async execute({ uuid }: GetRestaurantByUuidUseCaseRequest): Promise<Restaurant | null> {
        const restaurant = await this.restaurantsRepository.findByUuid(uuid);

        if (!restaurant) {
            throw new ResourceNotFoundError();
        }

        return restaurant;
    }
}