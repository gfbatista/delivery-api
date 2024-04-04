import { CategoriesRepository } from '@/repositories/categories-repository';
import { RestaurantsRepository } from '@/repositories/restaurants-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface UpdateRestaurantRequest {
    uuid: string
    name: string
    category: {
        id: number
    }
    description: string
    city: string
    street: string
    district: string
    state: string
    number?: number
    zipcode?: string
    latitude: number
    longitude: number
}

export class UpdateRestaurantUseCase {
    constructor(private restaurantsRepository: RestaurantsRepository, private categoriesRepository: CategoriesRepository) { }

    async execute({ uuid, name, category, description, street, city, state, district, number, zipcode, latitude, longitude }: UpdateRestaurantRequest) {
        const restaurant = await this.restaurantsRepository.findByUuid(uuid);

        if (!restaurant) {
            throw new ResourceNotFoundError();
        }

        const categoryId = category.id;

        const categoryFound = await this.categoriesRepository.findById(categoryId);

        if (!categoryFound) {
            throw new ResourceNotFoundError();
        }

        await this.restaurantsRepository.save({
            name,
            categoryId,
            description,
            street,
            city,
            state,
            district,
            number,
            zipcode,
            latitude,
            longitude
        }, uuid);
    }
}