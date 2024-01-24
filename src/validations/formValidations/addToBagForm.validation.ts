import { z } from "zod";

export const addToBagFormSchema = z.object({
   quantity: z.coerce.number().gte(1, { message: "Minimum value: 1" }),
});

export type AddToBagFormType = z.infer<typeof addToBagFormSchema>;
