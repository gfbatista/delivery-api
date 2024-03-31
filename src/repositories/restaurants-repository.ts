import { Prisma, Restaurant } from '@prisma/client';

export interface RestaurantsRepository {
    create(data: Prisma.RestaurantUncheckedCreateInput): Promise<Restaurant>
    findByUuid(uuid: string): Promise<Restaurant | null>
    delete(restaurant: Restaurant): Promise<void>
    findMany(page: number): Promise<Restaurant[]>
    save(data: Prisma.RestaurantUncheckedCreateInput, uuid: string): Promise<void>
}