import { NOT_FOUND, NO_CONTENT } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UpdateUserUseCase } from '@/use-cases/users/update-user';

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
    const updateUserBodySchema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90;
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180;
        }),
    });

    const { name, email, password, latitude, longitude } =
        updateUserBodySchema.parse(request.body);

    const updateUserParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = updateUserParamsSchema.parse(request.params);

    try {
        const usersRepository = new PrismaUsersRepository();
        const updateUserUseCase = new UpdateUserUseCase(usersRepository);

        await updateUserUseCase.execute({
            uuid,
            name,
            email,
            password,
            latitude,
            longitude
        });

        return reply.status(NO_CONTENT).send();
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}