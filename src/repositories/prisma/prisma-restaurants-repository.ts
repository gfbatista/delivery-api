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
}