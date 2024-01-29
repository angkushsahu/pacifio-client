import { z } from "zod";

import { responseSchema } from "./response.validation";

export const orderInfoSchema = responseSchema.merge(
   z.object({
      data: z.object({
         totalOrders: z.number(),
         orderGroup: z.object({
            processing: z.number(),
            shipped: z.number(),
            delivered: z.number(),
         }),
      }),
   })
);

export const productInfoSchema = responseSchema.merge(
   z.object({
      data: z.object({
         totalProducts: z.number(),
         productGroup: z.object({
            inStock: z.number(),
            outOfStock: z.number(),
         }),
      }),
   })
);

export const userInfoSchema = responseSchema.merge(
   z.object({
      data: z.object({
         totalUsers: z.number(),
         userGroup: z.object({
            user: z.number(),
            admin: z.number(),
            "super-admin": z.number(),
         }),
      }),
   })
);

export const salesGraphSchema = responseSchema.merge(
   z.object({
      data: z.object({
         monthlySales: z.array(z.object({ name: z.string(), total: z.number() })),
      }),
   })
);

export const transactionInfoSchema = responseSchema.merge(
   z.object({
      data: z.object({
         totalTransactions: z.number(),
         totalSales: z.number(),
         averageTransactions: z.number(),
      }),
   })
);

export const recentSalesSchema = responseSchema.merge(
   z.object({
      data: z.object({
         totalOrders: z.number(),
         totalPriceOfRecentSales: z.number(),
         orders: z.array(
            z.object({
               user: z.object({
                  name: z.string(),
                  email: z.string(),
                  id: z.string(),
               }),
               totalPrice: z.number(),
               id: z.string(),
               createdAt: z.string(),
            })
         ),
      }),
   })
);

export type ProductInfoType = z.infer<typeof productInfoSchema>;
export type OrderInfoType = z.infer<typeof orderInfoSchema>;
export type UserInfoType = z.infer<typeof userInfoSchema>;

export type TransactionInfoType = z.infer<typeof transactionInfoSchema>;
export type RecentSalesType = z.infer<typeof recentSalesSchema>;
export type SalesGraphType = z.infer<typeof salesGraphSchema>;
