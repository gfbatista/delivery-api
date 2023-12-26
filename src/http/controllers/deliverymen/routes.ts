import { FastifyInstance } from 'fastify';
import { createDeliveryman } from './create-deliveryman';
import { getAllDeliverymen } from './get-all-deliverymen';
import { getDeliverymanByUuid } from './get-deliveryman-by-uuid';

export async function deliverymenRoutes(app: FastifyInstance) {
    app.post('/deliverymen', createDeliveryman);
    app.get('/deliverymen', getAllDeliverymen);
    app.get('/deliverymen/:uuid', getDeliverymanByUuid);
}