import { OK } from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaDeliverymenRepository } from '@/repositories/prisma/prisma-deliverymen-repository';
import { GetAllDeliverymenUseCase } from '@/use-cases/deliverymen/get-all-deliverymen';

export async function getAllDeliverymen(request: FastifyRequest, reply: FastifyReply) {
    const deliverymenPageQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    });

    const { page } = deliverymenPageQuerySchema.parse(request.query);

    const deliverymenRepository = new PrismaDeliverymenRepository();
    const getAllDeliverymenUseCase = new GetAllDeliverymenUseCase(deliverymenRepository);

    const { deliverymen } = await getAllDeliverymenUseCase.execute(page);

    return reply.status(OK).send(deliverymen);
}