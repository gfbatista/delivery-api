import { FastifyInstance } from 'fastify';
import { createDeliveryman } from './create-deliveryman';

export async function deliverymenRoutes(app: FastifyInstance) {
    app.post('/deliverymen', createDeliveryman);
}