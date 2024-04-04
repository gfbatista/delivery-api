import { Prisma, Restaurant } from '@prisma/client';
import { prisma } from '@/config/prisma';
import { RestaurantsRepository } from '../restaurants-repository';

export class PrismaRestaurantsRepository implements RestaurantsRepository {
    async create(data: Prisma.RestaurantUncheckedCreateInput) {
        const restaurant = await prisma.restaurant.create({
            data,
        });

        return restaurant;
    }

    async findByUuid(uuid: string): Promise<Restaurant | null> {
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                uuid,
            },
        });

        return restaurant;
    }

    async delete(restaurant: Restaurant): Promise<void> {
        await prisma.restaurant.update({
            where: {
                id: restaurant.id,
            },
            data: restaurant,
        });
    }

    async findMany(page: number): Promise<Restaurant[]> {
        const restaurants = await prisma.restaurant.findMany({
            include: {
                category: true,
            },
            where: {
                deletedAt: null
            },
            skip: (page - 1) * 10,
            take: 10,
        });

        return restaurants;
    }

    async save(data: Prisma.RestaurantUncheckedCreateInput, uuid: string): Promise<void> {
        await prisma.restaurant.update({
            where: {
                uuid,
            },
            data,
        });
    }

    async findById(id: number) {
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id,
            },
        });
    
        return restaurant;
    }
}