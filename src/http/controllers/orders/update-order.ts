import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository';
import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';
import { PrismaRestaurantsRepository } from '@/repositories/prisma/prisma-restaurants-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { UpdateOrderUseCase } from '@/use-cases/orders/update-order';
import { FastifyReply, FastifyRequest } from 'fastify';
import { NOT_FOUND, NO_CONTENT } from 'http-status';
import { z } from 'zod';

export async function updateOrder(request: FastifyRequest, reply: FastifyReply) {
    const user = { id: Number(request.user.sub) };

    const updateOrderBodySchema = z.object({
        restaurant: z.object({
            id: z.number(),
        }),
        address: z.object({
            id: z.number(),
        }),
        total: z.number(),
    });

    const { restaurant, address, total } =
        updateOrderBodySchema.parse(request.body);

    const updateOrderParamsSchema = z.object({
        uuid: z.string().uuid(),
    });

    const { uuid } = updateOrderParamsSchema.parse(request.params);

    try {
        const ordersRepository = new PrismaOrdersRepository();
        const restaurantsRepository = new PrismaRestaurantsRepository();
        const addressesRepository = new PrismaAddressesRepository();

        const updateOrderUseCase = new UpdateOrderUseCase(ordersRepository, addressesRepository, restaurantsRepository);

        await updateOrderUseCase.execute({
            uuid, user, restaurant, address, total
        });

        return reply.status(NO_CONTENT).send();
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}