import { CategoriesRepository } from '@/repositories/categories-repository';
import { RestaurantsRepository } from '@/repositories/restaurants-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface CreateRestaurantRequest {
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

export class CreateRestaurantUseCase {
    constructor(private restaurantsRepository: RestaurantsRepository, private categoriesRepository: CategoriesRepository) { }

    async execute({ name, category, description, street, city, state, district, number, zipcode, latitude, longitude }: CreateRestaurantRequest) {

        const categoryId = category.id;

        const categoryFound = await this.categoriesRepository.findById(categoryId);

        if (!categoryFound) {
            throw new ResourceNotFoundError();
        }

        const restaurant = await this.restaurantsRepository.create({
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
        });

        return { restaurant };
    }
}