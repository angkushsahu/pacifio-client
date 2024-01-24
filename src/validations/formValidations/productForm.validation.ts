import { z } from "zod";

export const createProductSchema = z.object({
   name: z.string().min(5, { message: "Minimum 5 characters" }),
   category: z.enum(["mouse", "cooling-pad", "mouse-pad", "keyboard", "headset", ""]),
   price: z.coerce.number().gte(1, { message: "Choose a valid price" }),
   stock: z.coerce.number().gte(1, { message: "Choose a valid stock" }),
   description: z.string().min(1, { message: "Required Field" }),
});

export type CreateProductType = z.infer<typeof createProductSchema>;
