import { Prisma, User } from '@prisma/client';
import { prisma } from '@/config/prisma';
import { UsersRepository } from '../users-repository';

export class PrismaUsersRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        });

        return user;
    }

    async findMany(page: number): Promise<User[]> {
        const users = await prisma.user.findMany({
            where: {
                deletedAt: null
            },
            skip: (page - 1) * 10,
            take: 10,
        });

        return users;
    }

    async findByUuid(uuid: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                uuid,
            },
        });

        return user;
    }

    async delete(user: User): Promise<void> {
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: user,
        });
    }

    async save(data: Prisma.UserUncheckedCreateInput, uuid: string): Promise<void> {
        await prisma.user.update({
            where: {
                uuid,
            },
            data,
        });
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }
}