import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { UpdateOrderPaymentUseCase } from '@/use-cases/orders/update-order-payment';
import { FastifyReply, FastifyRequest } from 'fastify';
import { NOT_FOUND, NO_CONTENT } from 'http-status';
import { z } from 'zod';

export async function updateOrderPayment(request: FastifyRequest, reply: FastifyReply) {
    const updateOrderPaymentBodySchema = z.object({
        status: z.enum(['PAID', 'NOT_PAID'])
    });

    const { status } =
        updateOrderPaymentBodySchema.parse(request.body);

    const updateOrderPaymentParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = updateOrderPaymentParamsSchema.parse(request.params);

    try {
        const ordersRepository = new PrismaOrdersRepository();
        const updateOrderPaymentUseCase = new UpdateOrderPaymentUseCase(ordersRepository);

        await updateOrderPaymentUseCase.execute({
            uuid,
            orderPayment: status
        });

        return reply.status(NO_CONTENT).send();
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}