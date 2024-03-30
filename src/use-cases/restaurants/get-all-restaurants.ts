import { RestaurantsRepository } from '@/repositories/restaurants-repository';
import { Restaurant } from '@prisma/client';

interface GetRestaurantsUseCaseResponse {
    restaurants: Restaurant[]
}

export class GetAllRestaurantsUseCase {
    constructor(private restaurantsRepository: RestaurantsRepository) { }

    async execute(page: number): Promise<GetRestaurantsUseCaseResponse> {
        const restaurants = await this.restaurantsRepository.findMany(page);

        return { restaurants };
    }
}