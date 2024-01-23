import { FastifyInstance } from 'fastify';
import { createAddress } from './create-address';
import { getAddressByUuid } from './get-address-by-uuid';
import { deleteAddress } from './delete-address';

export async function addressesRoutes(app: FastifyInstance) {
    app.post('/addresses/:uuid', createAddress);
    app.get('/addresses/:uuid', getAddressByUuid);
    app.delete('/addresses/:uuid', deleteAddress);
}