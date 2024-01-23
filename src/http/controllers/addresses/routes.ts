import { FastifyInstance } from 'fastify';
import { createAddress } from './create-address';
import { getAddressByUuid } from './get-address-by-uuid';

export async function addressesRoutes(app: FastifyInstance) {
    app.post('/addresses/:uuid', createAddress);
    app.get('/addresses/:uuid', getAddressByUuid);
}