import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { createOrder } from './create-order';
import { getAllOrdersByUser } from './get-all-orders';
import { getOrderByUuid } from './get-order-by-uuid';
import { updateOrderRate } from './update-order-rate';
import { updateOrderStatus } from './update-order-status';
import { updateOrderPayment } from './update-order-payment';

export async function ordersRoutes(app: FastifyInstance) {
    app.post('/orders', { onRequest: [verifyJwt] }, createOrder);
    app.get('/orders', { onRequest: [verifyJwt] }, getAllOrdersByUser);
    app.get('/orders/:uuid', { onRequest: [verifyJwt] }, getOrderByUuid);
    app.put('/orders/:uuid/rate', { onRequest: [verifyJwt] }, updateOrderRate);
    app.put('/orders/:uuid/status', updateOrderStatus);
    app.put('/orders/:uuid/payment', updateOrderPayment);
}