import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetUserProfileUseCase } from '@/use-cases/users/get-user-profile';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
    const usersRepository = new PrismaUsersRepository();
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);

    const { user } = await getUserProfileUseCase.execute({
        userId: Number(request.user.sub),
    });

    return reply.status(200).send({
        user: {
            ...user,
            password: undefined,
        },
    });
}
