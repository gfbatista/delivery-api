import { CONFLICT, CREATED } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { CreateUserUseCase } from '@/use-cases/users/create-user';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
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

    const { name, email, latitude, longitude, password } =
        createUserBodySchema.parse(request.body);

    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const createUserUseCase = new CreateUserUseCase(prismaUsersRepository);

        const { user } = await createUserUseCase.execute({
            name, email, latitude, longitude, password
        });

        return reply.status(CREATED).send(user);
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(CONFLICT).send({ message: err.message });
        }

        throw err;
    }
}