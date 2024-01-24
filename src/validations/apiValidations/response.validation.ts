import { z } from "zod";

export const errorSchema = z.object({
   message: z.union([z.string(), z.array(z.string())]),
   success: z.boolean(),
   statusCode: z.coerce.number(),
});

export const responseSchema = z.object({
   message: z.string(),
   success: z.boolean(),
   statusCode: z.number(),
});

export type ErrorResponseType = z.infer<typeof errorSchema>;
export type ResponseType = z.infer<typeof responseSchema>;
