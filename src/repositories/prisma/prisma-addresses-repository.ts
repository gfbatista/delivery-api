import { Prisma } from '@prisma/client';
import { prisma } from '@/config/prisma';
import { AddressesRepository } from '../addresses-repository';

export class PrismaAddressesRepository implements AddressesRepository {
    async create(data: Prisma.AddressUncheckedCreateInput) {
        const address = await prisma.address.create({
            data,
        });

        return address;
    }

    async updatePrimaryAddressToFalse(userId: number): Promise<void> {
        await prisma.address.updateMany({
            where: {
                userId,
            },
            data: {
                primary: false
            },
        });
    }
}