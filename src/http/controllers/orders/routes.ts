import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { createOrder } from './create-order';
import { getAllOrdersByUser } from './get-all-orders';

export async function ordersRoutes(app: FastifyInstance) {
    app.post('/orders', { onRequest: [verifyJwt] }, createOrder);
    app.get('/orders', { onRequest: [verifyJwt] }, getAllOrdersByUser);
}