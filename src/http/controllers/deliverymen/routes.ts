import { FastifyInstance } from 'fastify';
import { createDeliveryman } from './create-deliveryman';
import { getAllDeliverymen } from './get-all-deliverymen';
import { getDeliverymanByUuid } from './get-deliveryman-by-uuid';
import { deleteDeliveryman } from './delete-deliveryman';
import { updateDeliveryman } from './update-deliveryman';
import { authenticate } from './authenticate';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { profile } from './profile';

export async function deliverymenRoutes(app: FastifyInstance) {
    app.post('/deliverymen/sessions', authenticate);
    app.get('/deliverymen/me', {onRequest: [verifyJwt]}, profile);

    app.post('/deliverymen', createDeliveryman);
    app.get('/deliverymen', getAllDeliverymen);
    app.get('/deliverymen/:uuid', getDeliverymanByUuid);
    app.patch('/deliverymen/:uuid', {onRequest: [verifyJwt]}, updateDeliveryman);
    app.delete('/deliverymen/:uuid', {onRequest: [verifyJwt]}, deleteDeliveryman);
}