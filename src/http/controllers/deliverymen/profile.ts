import { PrismaDeliverymenRepository } from '@/repositories/prisma/prisma-deliverymen-repository';
import { GetDeliverymanProfileUseCase } from '@/use-cases/deliverymen/get-deliveryman-profile';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
    const deliverymenRepository = new PrismaDeliverymenRepository();
    const getDeliverymanProfileUseCase = new GetDeliverymanProfileUseCase(deliverymenRepository);

    const { deliveryman } = await getDeliverymanProfileUseCase.execute({
        deliverymanUuid: request.user.sub,
    });

    return reply.status(200).send({
        user: {
            ...deliveryman,
            password: undefined,
        },
    });
}
