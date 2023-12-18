import { FastifyInstance } from 'fastify';
import { createUser } from './create-user';
import { getAllUsers } from './get-all-users';

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', createUser);
    app.get('/users', getAllUsers);
}