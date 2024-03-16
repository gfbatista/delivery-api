import { Deliveryman, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { DeliverymenRepository } from '../deliverymen-repository';

export class InMemoryDeliverymenRepository implements DeliverymenRepository {
    public deliverymen: Deliveryman[] = [];

    async create(data: Prisma.DeliverymanCreateInput) {
        const deliveryman = {
            id: 1,
            uuid: data.uuid ?? randomUUID(),
            name: data.name,
            driversLicense: data.driversLicense,
            password: data.password,
            company: data.company,
            phone: data.phone,
            street: data.street,
            city: data.city,
            district: data.district,
            state: data.state,
            number: data.number ?? null,
            zipcode: data.zipcode ?? null,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        };

        this.deliverymen.push(deliveryman);

        return deliveryman;
    }

    async findMany(page: number) {
        return this.deliverymen
            .slice((page - 1) * 10, page * 10);
    }

    async findByUuid(uuid: string) {
        const deliveryman = this.deliverymen.find((item) => item.uuid === uuid);

        if (!deliveryman) {
            return null;
        }

        return deliveryman;
    }

    async save(data: Prisma.DeliverymanUncheckedCreateInput, uuid: string) {
        const deliverymanIndex = this.deliverymen.findIndex((item) => item.uuid === uuid);

        if (deliverymanIndex >= 0) {
            const deliveryman = {
                id: data.id ?? 1,
                uuid: data.uuid ?? randomUUID(),
                name: data.name,
                driversLicense: data.driversLicense,
                password: data.password,
                company: data.company,
                phone: data.phone,
                street: data.street,
                city: data.city,
                district: data.district,
                state: data.state,
                number: data.number ?? null,
                zipcode: data.zipcode ?? null,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            };
            this.deliverymen[deliverymanIndex] = deliveryman;
        }
    }

    async delete(deliveryman: Deliveryman) {
        const deliverymanIndex = this.deliverymen.findIndex((item) => item.id === deliveryman.id);

        if (deliverymanIndex >= 0) {
            this.deliverymen[deliverymanIndex] = deliveryman;
        }
    }

    async findByDriversLicense(driversLicense: string) {
        const deliveryman = this.deliverymen.find((item) => item.driversLicense === driversLicense);

        if (!deliveryman) {
            return null;
        }
        return deliveryman;
    }

}


