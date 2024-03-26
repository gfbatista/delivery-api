import { z } from 'zod';

export const addressBodySchema = z.object({
    street: z.string(),
    city: z.string(),
    district: z.string(),
    state: z.string(),
    number: z.number().optional(),
    zipcode: z.string().length(9).optional(),
    latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180;
    }),
});