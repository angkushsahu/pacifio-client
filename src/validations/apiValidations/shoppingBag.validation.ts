import { z } from "zod";

import { responseSchema } from "./response.validation";

export const shoppingBagItemSchema = z.object({
   itemPrice: z.number(),
   quantity: z.number(),
   product: z.object({
      _id: z.string(),
      name: z.string(),
      price: z.number(),
      stock: z.number(),
      defaultImage: z.object({
         publicUrl: z.string(),
         secureUrl: z.string(),
      }),
   }),
});

export const shoppingBagResponseSchema = responseSchema.merge(
   z.object({
      data: z.object({
         shoppingBag: z.object({
            id: z.string(),
            totalPrice: z.number(),
            totalProducts: z.number(),
            products: z.array(shoppingBagItemSchema),
         }),
      }),
   })
);

export type ShoppingBagResponseType = z.infer<typeof shoppingBagResponseSchema>;
export type ShoppingBagItemType = z.infer<typeof shoppingBagItemSchema>;
