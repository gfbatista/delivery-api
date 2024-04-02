import { Prisma, Restaurant } from '@prisma/client';
import { RestaurantsRepository } from '../restaurants-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryRestaurantsRepository implements RestaurantsRepository {
    public restaurants: Restaurant[] = [];

    async create(data: Prisma.RestaurantUncheckedCreateInput) {
        const restaurant = this.buildRestaurantPayload(data);

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

    async delete(restaurant: Restaurant) {
        const restaurantIndex = this.restaurants.findIndex((item) => item.id === restaurant.id);

        if (restaurantIndex >= 0) {
            this.restaurants[restaurantIndex] = restaurant;
        }
    }

    async findMany(page: number) {
        return this.restaurants
            .slice((page - 1) * 10, page * 10);
    }

    async save(data: Prisma.RestaurantUncheckedCreateInput, uuid: string): Promise<void> {
        const restaurantIndex = this.restaurants.findIndex((item) => item.uuid === uuid);

        if (restaurantIndex >= 0) {
            const restaurant = this.buildRestaurantPayload(data, uuid);

            this.restaurants[restaurantIndex] = restaurant;
        }
    }

    buildRestaurantPayload(data: Prisma.RestaurantUncheckedCreateInput, uuid?: string) {
        const restaurant = {
            id: 1,
            uuid: uuid ?? data.uuid ?? randomUUID(),
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
        return restaurant;
    }

}


