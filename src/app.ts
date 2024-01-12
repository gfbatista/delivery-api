import fastify from 'fastify';
import { ZodError } from 'zod';
import { categoriesRoutes } from './http/controllers/categories/routes';
import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from 'http-status';
import { env } from './env';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { swaggerOptions, swaggerUiOptions } from './config/swagger';
import { usersRoutes } from './http/controllers/users/routes';
import { deliverymenRoutes } from './http/controllers/deliverymen/routes';
import { addressesRoutes } from './http/controllers/addresses/routes';

export const app = fastify();

app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);

app.register(categoriesRoutes);
app.register(usersRoutes);
app.register(deliverymenRoutes);
app.register(addressesRoutes);

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(BAD_REQUEST)
            .send({ message: 'Validation error.', issues: error.format() });
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    }

    return reply.status(INTERNAL_SERVER_ERROR).send({ message: 'Internal server error.' });
});
