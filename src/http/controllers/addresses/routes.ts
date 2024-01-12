import { FastifyInstance } from 'fastify';
import { createAddress } from './create-address';

export async function addressesRoutes(app: FastifyInstance) {
    app.post('/addresses/:uuid', createAddress);
}