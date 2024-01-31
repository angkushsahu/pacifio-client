import { z } from "zod";

import { responseSchema } from "./response.validation";
import { userSchema } from "./user.validation";

export const reviewSchema = z.object({
   id: z.string(),
   user: userSchema,
   comment: z.string(),
   rating: z.number(),
   createdAt: z.string(),
});

export const reviewResponseSchema = responseSchema.merge(
   z.object({
      data: z.object({
         review: reviewSchema.optional(),
      }),
   })
);

export const allReviewResponseSchema = responseSchema.merge(
   z.object({
      data: z.object({
         totalReviews: z.number(),
         totalPages: z.number(),
         numberOfFetchedReviews: z.number(),
         reviews: z.array(reviewSchema),
      }),
   })
);

export type AllReviewResponseType = z.infer<typeof allReviewResponseSchema>;
export type ReviewResponseType = z.infer<typeof reviewResponseSchema>;
export type ReviewType = z.infer<typeof reviewSchema>;
