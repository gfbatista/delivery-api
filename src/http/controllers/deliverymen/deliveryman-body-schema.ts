import { z } from 'zod';

export const deliverymanBodySchema = z.object({
    name: z.string().min(3),
    driversLicense: z.string().length(11),
    password: z.string(),
    company: z.string(),
    phone: z.string(),
    street: z.string(),
    city: z.string(),
    district: z.string(),
    state: z.string(),
    number: z.number().optional(),
    zipcode: z.string().length(9).optional(),
});