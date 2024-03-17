import { FastifyInstance } from 'fastify';
import { createAddress } from './create-address';
import { getAddressByUuid } from './get-address-by-uuid';
import { deleteAddress } from './delete-address';
import { updateAddress } from './update-address';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { updatePrimaryAddress } from './update-primary-address';

export async function addressesRoutes(app: FastifyInstance) {
    app.post('/addresses', { onRequest: [verifyJwt] }, createAddress);
    app.get('/addresses/:uuid', { onRequest: [verifyJwt] }, getAddressByUuid);
    app.delete('/addresses/:uuid', { onRequest: [verifyJwt] }, deleteAddress);
    app.patch('/addresses/:uuid', { onRequest: [verifyJwt] }, updateAddress);
    app.patch('/addresses/:uuid/primary', { onRequest: [verifyJwt] }, updatePrimaryAddress);
}