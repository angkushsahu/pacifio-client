import { z } from "zod";

export const searchSchema = z.object({
   searchTerm: z.string().min(3, { message: "Minimum three characters required to search" }),
   categories: z.array(z.string().min(1, { message: "Enter category" })),
   priceRange: z.tuple([z.coerce.number(), z.coerce.number()]),
   ratingRange: z.tuple([z.coerce.number(), z.coerce.number()]),
});

export type SearchSchemaType = z.infer<typeof searchSchema>;
