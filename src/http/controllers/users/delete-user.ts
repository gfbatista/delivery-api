import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { DeleteUserUseCase } from '@/use-cases/users/delete-user';
import { FastifyReply, FastifyRequest } from 'fastify';
import { NOT_FOUND, NO_CONTENT } from 'http-status';
import { z } from 'zod';

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const deleteUserParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = deleteUserParamsSchema.parse(request.params);

    try {
        const usersRepository = new PrismaUsersRepository();
        const deleteUsersUseCase = new DeleteUserUseCase(usersRepository);

        await deleteUsersUseCase.execute({ uuid });

        return reply.status(NO_CONTENT).send();    
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}