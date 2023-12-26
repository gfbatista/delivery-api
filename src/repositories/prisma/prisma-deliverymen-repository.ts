import { Deliveryman, Prisma } from '@prisma/client';
import { prisma } from '@/config/prisma';
import { DeliverymenRepository } from '../deliverymen-repository';

export class PrismaDeliverymenRepository implements DeliverymenRepository {
    async create(data: Prisma.DeliverymanCreateInput) {
        const deliveryman = await prisma.deliveryman.create({
            data,
        });

        return deliveryman;
    }

    async findMany(page: number): Promise<Deliveryman[]> {
        const deliverymen = await prisma.deliveryman.findMany({
            where: {
                deletedAt: null
            },
            skip: (page - 1) * 10,
            take: 10,
        });

        return deliverymen;
    }

    async findByUuid(uuid: string): Promise<Deliveryman | null> {
        const deliveryman = await prisma.deliveryman.findUnique({
            where: {
                uuid,
            },
        });

        return deliveryman;
    }

    async delete(deliveryman: Deliveryman): Promise<void> {
        await prisma.deliveryman.update({
            where: {
                id: deliveryman.id,
            },
            data: deliveryman,
        });
    }

    async save(data: Prisma.DeliverymanUncheckedCreateInput, uuid: string): Promise<void> {
        await prisma.deliveryman.update({
            where: {
                uuid,
            },
            data,
        });
    }

    async findByDriversLicense(driversLicense: string) {
        const deliveryman = await prisma.deliveryman.findUnique({
            where: {
                driversLicense,
            },
        });

        return deliveryman;
    }
}