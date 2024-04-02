import { z } from 'zod';

export const restaurantBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    street: z.string(),
    category: z.object({
        id: z.number()
    }),
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