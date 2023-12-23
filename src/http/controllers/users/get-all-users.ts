import { OK } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GetAllUsersUseCase } from '@/use-cases/users/get-all-users';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { z } from 'zod';

export async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    const usersPageQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    });

    const { page } = usersPageQuerySchema.parse(request.query);

    const usersRepository = new PrismaUsersRepository();
    const getAllUsersUseCase = new GetAllUsersUseCase(usersRepository);

    const { users } = await getAllUsersUseCase.execute(page);

    return reply.status(OK).send(users);
}