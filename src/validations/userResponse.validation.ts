import { z } from "zod";

export const userSchema = z.object({
   createdAt: z.string(),
   email: z.string().email(),
   id: z.string(),
   name: z.string(),
   role: z.enum(["user", "admin", "super-admin"]),
});

export type IUser = z.infer<typeof userSchema>;
