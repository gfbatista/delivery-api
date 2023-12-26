import { CONFLICT, CREATED } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CreateDeliverymanUseCase } from '@/use-cases/deliverymen/create-deliveryman';
import { PrismaDeliverymenRepository } from '@/repositories/prisma/prisma-deliverymen-repository';
import { DeliverymanAlreadyExistsError } from '@/use-cases/errors/deliveryman-already-exists-error';

export async function createDeliveryman(request: FastifyRequest, reply: FastifyReply) {
    const createDeliverymanBodySchema = z.object({
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
        createDeliverymanBodySchema.parse(request.body);

    try {
        const prismaDeliverymenRepository = new PrismaDeliverymenRepository();
        const createDeliverymanUseCase = new CreateDeliverymanUseCase(prismaDeliverymenRepository);

        const { deliveryman } = await createDeliverymanUseCase.execute({
            name, driversLicense, company, phone, street, city, district, state, number, zipcode
        });

        return reply.status(CREATED).send(deliveryman);
    } catch (err) {
        if (err instanceof DeliverymanAlreadyExistsError) {
            return reply.status(CONFLICT).send({ message: err.message });
        }

        throw err;
    }
}