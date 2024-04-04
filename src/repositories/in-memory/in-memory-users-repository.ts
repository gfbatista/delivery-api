import { Prisma, User } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { UsersRepository } from '../users-repository';

export class InMemoryUsersRepository implements UsersRepository {
    public users: User[] = [];

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: 1,
            uuid: data.uuid ?? randomUUID(),
            name: data.name,
            email: data.email,
            password: data.password,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        };
        this.users.push(user);

        return user;
    }

    async findMany(page: number) {
        return this.users
            .slice((page - 1) * 10, page * 10);
    }

    async findByUuid(uuid: string) {
        const user = this.users.find((user) => user.uuid === uuid);

        if (!user) {
            return null;
        }

        return user;
    }

    async save(data: Prisma.UserUncheckedCreateInput, uuid: string) {
        const userIndex = this.users.findIndex((item) => item.uuid === uuid);

        if (userIndex >= 0) {
            const user = {
                id: data.id ?? 1,
                uuid: data.uuid ?? randomUUID(),
                name: data.name,
                email: data.email,
                password: data.password,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            };
            this.users[userIndex] = user;
        }
    }

    async delete(user: User) {
        const userIndex = this.users.findIndex((item) => item.id === user.id);

        if (userIndex >= 0) {
            this.users[userIndex] = user;
        }
    }

    async findByEmail(email: string) {
        const user = this.users.find((item) => item.email === email);

        if (!user) {
            return null;
        }
        return user;
    }

    async findById(id: number) {
        const user = this.users.find((item) => item.id === id);
    
        if (!user) {
            return null;
        }
        return user;
    }
}


