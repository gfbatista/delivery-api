import { FastifyInstance } from 'fastify';
import { createDeliveryman } from './create-deliveryman';
import { getAllDeliverymen } from './get-all-deliverymen';
import { getDeliverymanByUuid } from './get-deliveryman-by-uuid';
import { deleteDeliveryman } from './delete-deliveryman';
import { updateDeliveryman } from './update-deliveryman';

export async function deliverymenRoutes(app: FastifyInstance) {
    app.post('/deliverymen', createDeliveryman);
    app.get('/deliverymen', getAllDeliverymen);
    app.get('/deliverymen/:uuid', getDeliverymanByUuid);
    app.patch('/deliverymen/:uuid', updateDeliveryman);
    app.delete('/deliverymen/:uuid', deleteDeliveryman);
}