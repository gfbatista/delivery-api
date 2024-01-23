import { Address, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { AddressesRepository } from '../addresses-repository';

export class InMemoryAddressesRepository implements AddressesRepository {
    public addresses: Address[] = [];

    async create(data: Prisma.AddressUncheckedCreateInput) {
        const address = {
            id: 1,
            uuid: data.uuid ?? randomUUID(),
            userId: data.userId,
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
            primary: true
        };

        this.addresses.push(address);

        return address;
    }

    async updatePrimaryAddressToFalse(userId: number) {
        const addresses = this.addresses.filter((item) => item.id === userId);

        addresses.forEach(address => {
            address.primary = false;
        });
    }

    async findByUuid(uuid: string): Promise<Address | null> {
        const address = this.addresses.find((address) => address.uuid === uuid);

        if (!address) {
            return null;
        }

        return address;
    }
}


