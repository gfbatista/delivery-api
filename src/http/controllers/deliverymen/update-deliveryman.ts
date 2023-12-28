import { CONFLICT, NOT_FOUND, NO_CONTENT } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { PrismaDeliverymenRepository } from '@/repositories/prisma/prisma-deliverymen-repository';
import { UpdateDeliverymanUseCase } from '@/use-cases/deliverymen/update-deliveryman';
import { DeliverymanAlreadyExistsError } from '@/use-cases/errors/deliveryman-already-exists-error';

export async function updateDeliveryman(request: FastifyRequest, reply: FastifyReply) {
    const updateDeliverymanBodySchema = z.object({
        name: z.string().min(3),
        driversLicense: z.string().length(11),
        company: z.string(),
        phone: z.string(),
        street: z.string(),
        city: z.string(),
        district: z.string(),
        state: z.string(),
        number: z.number().optional(),
        zipcode: z.string().length(9).optional(),
    });

    const { name, driversLicense, company, phone, street, city, district, state, number, zipcode } =
        updateDeliverymanBodySchema.parse(request.body);

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