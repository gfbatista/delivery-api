import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { PrismaDeliverymenRepository } from '@/repositories/prisma/prisma-deliverymen-repository';
import { AuthenticateUseCase } from '@/use-cases/deliverymen/authenticate';

export async function authenticate(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const authenticateBodySchema = z.object({
        driversLicense: z.string(),
        password: z.string().min(6),
    });

    const { driversLicense, password } = authenticateBodySchema.parse(request.body);

    try {
        const deliverymenRepository = new PrismaDeliverymenRepository();
        const authenticateUseCase = new AuthenticateUseCase(deliverymenRepository);

        const { deliveryman } = await authenticateUseCase.execute({
            driversLicense,
            password,
        });

        const token = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: deliveryman.uuid,
                },
            },
        );

        return reply
            .status(200)
            .send({
                token,
            });
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message });
        }

        throw err;
    }
}
