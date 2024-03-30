import { Prisma, Restaurant } from '@prisma/client';

export interface RestaurantsRepository {
    create(data: Prisma.RestaurantUncheckedCreateInput): Promise<Restaurant>
    findByUuid(uuid: string): Promise<Restaurant | null>
}