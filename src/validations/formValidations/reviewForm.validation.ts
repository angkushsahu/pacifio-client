import { z } from "zod";

export const reviewFormSchema = z.object({
   comment: z.string().min(10, { message: "Review comment should be at least 10 characters long" }),
   rating: z.coerce
      .number()
      .gte(1, { message: "Minimum review should at least be 1" })
      .lte(5, { message: "Maximum review is 5" }),
});

export type ReviewFormType = z.infer<typeof reviewFormSchema>;
