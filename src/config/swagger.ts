import { env } from '@/env';

export const swaggerOptions = {
    swagger: {
        info: {
            title: 'delivery-api',
            description: 'Order Delivery Management',
            version: '1.0.0',
        },
        host: `localhost:${env.PORT}`,
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
};

export const swaggerUiOptions = {
    routePrefix: '/docs',
    exposeRoute: true,
};