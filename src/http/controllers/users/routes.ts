import { FastifyInstance } from 'fastify';
import { createUser } from './create-user';
import { getAllUsers } from './get-all-users';
import { getUserByUuid } from './get-user-by-uuid';
import { deleteUser } from './delete-user';
import { updateUser } from './update-users';

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', createUser);
    app.get('/users', getAllUsers);
    app.get('/users/:uuid', getUserByUuid);
    app.patch('/users/:uuid', updateUser);
    app.delete('/users/:uuid', deleteUser);
}