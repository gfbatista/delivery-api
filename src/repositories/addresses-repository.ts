import { Address, Prisma } from '@prisma/client';

export interface AddressesRepository {
    create(data: Prisma.AddressUncheckedCreateInput): Promise<Address>
    updatePrimaryAddressToFalse(userId: number): Promise<void>
    findByUuid(uuid: string): Promise<Address | null>
    delete(address: Address): Promise<void>
    save(data: Prisma.AddressUncheckedCreateInput, uuid: string): Promise<void>
    updatePrimaryAddress(uuid: string, primary: boolean): Promise<void>
}