import { FastifyInstance } from 'fastify';
import { createUser } from './create-user';
import { getAllUsers } from './get-all-users';
import { getUserByUuid } from './get-user-by-uuid';
import { deleteUser } from './delete-user';
import { updateUser } from './update-users';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { verifyJwt } from '@/http/middlewares/verify-jwt';

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users/sessions', authenticate);
    app.get('/users/me', {onRequest: [verifyJwt]}, profile);

    app.post('/users', createUser);
    app.get('/users', getAllUsers);
    app.get('/users/:uuid', getUserByUuid);
    app.patch('/users/:uuid', {onRequest: [verifyJwt]}, updateUser);
    app.delete('/users/:uuid', {onRequest: [verifyJwt]}, deleteUser);
}