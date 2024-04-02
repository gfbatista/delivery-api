import { PrismaDeliverymenRepository } from '@/repositories/prisma/prisma-deliverymen-repository';
import { UpdateDeliverymanUseCase } from '@/use-cases/deliverymen/update-deliveryman';
import { DeliverymanAlreadyExistsError } from '@/use-cases/errors/deliveryman-already-exists-error';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CONFLICT, NOT_FOUND, NO_CONTENT } from 'http-status';
import { z } from 'zod';
import { deliverymanBodySchema } from './deliveryman-body-schema';

export async function updateDeliveryman(request: FastifyRequest, reply: FastifyReply) {
    const { name, driversLicense, password, company, phone, street, city, district, state, number, zipcode } =
        deliverymanBodySchema.parse(request.body);

    const updateDeliverymanParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = updateDeliverymanParamsSchema.parse(request.params);

    try {
        const deliverymenRepository = new PrismaDeliverymenRepository();
        const updateDeliverymanUseCase = new UpdateDeliverymanUseCase(deliverymenRepository);

        await updateDeliverymanUseCase.execute({
            uuid,
            name,
            driversLicense,
            password,
            company,
            phone,
            street,
            city,
            district,
            state,
            number,
            zipcode
        });

        return reply.status(NO_CONTENT).send();
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        } else if (err instanceof DeliverymanAlreadyExistsError) {
            return reply.status(CONFLICT).send({ message: err.message });
        }

        throw err;
    }
}