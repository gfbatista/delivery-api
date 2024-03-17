import { Deliveryman, Prisma } from '@prisma/client';

export interface DeliverymenRepository {
    create(data: Prisma.DeliverymanCreateInput): Promise<Deliveryman>
    findMany(page: number): Promise<Deliveryman[]>
    findByUuid(uuid: string): Promise<Deliveryman | null>
    delete(category: Deliveryman): Promise<void>
    save(data: Prisma.DeliverymanUncheckedCreateInput, uuid: string): Promise<void>
    findByDriversLicense(driversLicense: string): Promise<Deliveryman | null>
    findById(id: number): Promise<Deliveryman | null>
}