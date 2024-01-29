import { z } from "zod";

import { addressFormSchema } from "../formValidations/addressForm.validation";
import { responseSchema } from "./response.validation";
import { userSchema } from "./user.validation";

export const orderSchema = z.object({
   id: z.string(),
   user: userSchema,
   address: addressFormSchema.merge(
      z.object({
         createdAt: z.string(),
         updatedAt: z.string(),
         _id: z.string(),
         user: z.string(),
      })
   ),
   products: z.array(
      z.object({
         productId: z.string(),
         name: z.string(),
         price: z.number(),
         quantity: z.number(),
         itemPrice: z.number(),
         image: z.string(),
         category: z.enum(["keyboard", "mouse", "mouse-pad", "cooling-pad", "headset"]),
      })
   ),
   deliveryInfo: z.object({
      status: z.enum(["processing", "shipped", "delivered"]),
      time: z.string().nullable(),
   }),
   paymentInfo: z.object({
      id: z.string().nullable(),
      status: z.enum(["paid", "not-paid"]),
      time: z.string().nullable(),
   }),
   totalPrice: z.number(),
   createdAt: z.string(),
});

export const orderResponseSchema = responseSchema.merge(
   z.object({
      data: z.object({
         order: orderSchema,
      }),
   })
);

export const allOrdersResponseSchema = responseSchema.merge(
   z.object({
      data: z.object({
         totalOrders: z.number(),
         numberOfFetchedOrders: z.number(),
         orders: z.array(orderSchema),
      }),
   })
);

export type AllOrdersResponseType = z.infer<typeof allOrdersResponseSchema>;
export type OrderResponseType = z.infer<typeof orderResponseSchema>;
export type OrderType = z.infer<typeof orderSchema>;
