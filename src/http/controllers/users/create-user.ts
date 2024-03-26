import { CONFLICT, CREATED } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { CreateUserUseCase } from '@/use-cases/users/create-user';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository';
import { addressBodySchema } from '../addresses/address-body-schema';

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
        address: addressBodySchema,
    });

    const { name, email, password, address } =
        createUserBodySchema.parse(request.body);

    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const addressesRepository = new PrismaAddressesRepository();

        const createUserUseCase = new CreateUserUseCase(prismaUsersRepository, addressesRepository);

        const { user } = await createUserUseCase.execute({
            name, email, password, address
        });

        return reply.status(CREATED).send(user);
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(CONFLICT).send({ message: err.message });
        }

        throw err;
    }
}