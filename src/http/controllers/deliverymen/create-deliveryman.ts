import { CONFLICT, CREATED } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateDeliverymanUseCase } from '@/use-cases/deliverymen/create-deliveryman';
import { PrismaDeliverymenRepository } from '@/repositories/prisma/prisma-deliverymen-repository';
import { DeliverymanAlreadyExistsError } from '@/use-cases/errors/deliveryman-already-exists-error';
import { deliverymanBodySchema } from './deliveryman-body-schema';

export async function createDeliveryman(request: FastifyRequest, reply: FastifyReply) {
    const { name, driversLicense, password, company, phone, street, city, district, state, number, zipcode } =
        deliverymanBodySchema.parse(request.body);

    try {
        const prismaDeliverymenRepository = new PrismaDeliverymenRepository();
        const createDeliverymanUseCase = new CreateDeliverymanUseCase(prismaDeliverymenRepository);

        const { deliveryman } = await createDeliverymanUseCase.execute({
            name, driversLicense, password, company, phone, street, city, district, state, number, zipcode
        });

        return reply.status(CREATED).send(deliveryman);
    } catch (err) {
        if (err instanceof DeliverymanAlreadyExistsError) {
            return reply.status(CONFLICT).send({ message: err.message });
        }

        throw err;
    }
}