import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { createOrder } from './create-order';

export async function ordersRoutes(app: FastifyInstance) {
    app.post('/orders', { onRequest: [verifyJwt] }, createOrder);
}