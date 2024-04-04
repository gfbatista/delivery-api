import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository';
import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';
import { PrismaRestaurantsRepository } from '@/repositories/prisma/prisma-restaurants-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { CreateOrderUseCase } from '@/use-cases/orders/create-order';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CREATED, NOT_FOUND } from 'http-status';
import { z } from 'zod';

export async function createOrder(request: FastifyRequest, reply: FastifyReply) {
    const user = { id: Number(request.user.sub) };

    const createOrderBodySchema = z.object({
        restaurant: z.object({
            id: z.number(),
        }),
        address: z.object({
            id: z.number(),
        }),
        total: z.number(),
    });

    const { restaurant, address, total } =
        createOrderBodySchema.parse(request.body);

    try {
        const ordersRepository = new PrismaOrdersRepository();
        const restaurantsRepository = new PrismaRestaurantsRepository();
        const addressesRepository = new PrismaAddressesRepository();

        const createOrderUseCase = new CreateOrderUseCase(ordersRepository, addressesRepository, restaurantsRepository);

        const { order } = await createOrderUseCase.execute({
            user, restaurant, address, total
        });

        return reply.status(CREATED).send(order);
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(NOT_FOUND).send({ message: err.message });
        }

        throw err;
    }
}