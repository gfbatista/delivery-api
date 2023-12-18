import { OK } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GetAllUsersUseCase } from '@/use-cases/users/get-all-users';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

export async function getAllUsers(_: FastifyRequest, reply: FastifyReply) {
    const usersRepository = new PrismaUsersRepository();
    const getAllUsersUseCase = new GetAllUsersUseCase(usersRepository);

    const { users } = await getAllUsersUseCase.execute();

    return reply.status(OK).send(users);
}