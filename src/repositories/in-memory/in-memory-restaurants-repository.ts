import { Prisma, Restaurant } from '@prisma/client';
import { RestaurantsRepository } from '../restaurants-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryRestaurantsRepository implements RestaurantsRepository {
    public restaurants: Restaurant[] = [];

    async create(data: Prisma.RestaurantUncheckedCreateInput) {
        const restaurant = {
            id: 1,
            uuid: data.uuid ?? randomUUID(),
            name: data.name,
            description: data.description,
            categoryId: data.categoryId,
            street: data.street,
            city: data.city,
            district: data.district,
            state: data.state,
            number: data.number ?? null,
            zipcode: data.zipcode ?? null,
            latitude: new Prisma.Decimal(String(data.latitude)),
            longitude: new Prisma.Decimal(String(data.longitude)),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        };

        this.restaurants.push(restaurant);

        return restaurant;
    }

    async findByUuid(uuid: string) {
        const restaurant = this.restaurants.find((restaurant) => restaurant.uuid === uuid);

        if (!restaurant) {
            return null;
        }

        return restaurant;
    }
}


