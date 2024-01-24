import { z } from "zod";

import { responseSchema } from "./response.validation";

export const productImageSchema = z.object({
   publicUrl: z.string(),
   secureUrl: z.string(),
});

export const productSchema = z.object({
   id: z.string(),
   name: z.string(),
   description: z.string(),
   category: z.enum(["mouse", "cooling-pad", "mouse-pad", "keyboard", "headset"]),
   defaultImage: productImageSchema,
   images: z.array(productImageSchema),
   price: z.number(),
   stock: z.number(),
   createdAt: z.string(),
   rating: z.object({
      totalRatings: z.number(),
      numberOfReviews: z.number(),
      averageRating: z.number(),
   }),
});

export const productResponseSchema = responseSchema.merge(
   z.object({
      data: z.object({
         product: productSchema,
      }),
   })
);

export const productImageResponseSchema = responseSchema.merge(
   z.object({
      data: z.object({
         product: productSchema,
         image: productImageSchema,
      }),
   })
);

export const allProductsResponseSchema = responseSchema.merge(
   z.object({
      data: z.object({
         totalProducts: z.number(),
         numberOfFetchedProducts: z.number(),
         products: z.array(
            productSchema.pick({
               id: true,
               category: true,
               defaultImage: true,
               name: true,
               price: true,
               rating: true,
               stock: true,
            })
         ),
      }),
   })
);

export type ProductImageResponseType = z.infer<typeof productImageResponseSchema>;
export type AllProductsResponseType = z.infer<typeof allProductsResponseSchema>;
export type ProductResponseType = z.infer<typeof productResponseSchema>;
export type ProductImageType = z.infer<typeof productImageSchema>;
export type ProductType = z.infer<typeof productSchema>;
