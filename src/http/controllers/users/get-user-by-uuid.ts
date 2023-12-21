import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { GetUserByUuidUseCase } from '@/use-cases/users/get-user-by-uuid';
import { FastifyReply, FastifyRequest } from 'fastify';
import { OK, NOT_FOUND } from 'http-status';
import { z } from 'zod';

export async function getUserByUuid(request: FastifyRequest, reply: FastifyReply) {
    const getUserByUuidParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = getUserByUuidParamsSchema.parse(request.params);

    try {
        const usersRepository = new PrismaUsersRepository();
        const getUserByUuidUseCase = new GetUserByUuidUseCase(usersRepository);

        const user = await getUserByUuidUseCase.execute({ uuid });

        return reply.status(OK).send(user);      
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}