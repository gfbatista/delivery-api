import { Prisma, User } from '@prisma/client';

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findMany(page: number): Promise<User[]>
    findByUuid(uuid: string): Promise<User | null>
    delete(category: User): Promise<void>
    save(data: Prisma.UserUncheckedCreateInput, uuid: string): Promise<void>
    findByEmail(email: string): Promise<User | null>
    findById(id: number): Promise<User | null>
}