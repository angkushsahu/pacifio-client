import { z } from "zod";

import { responseSchema } from "./response.validation";

export const userSchema = z.object({
   createdAt: z.string(),
   email: z.string().email(),
   id: z.string(),
   name: z.string(),
   role: z.enum(["user", "admin", "super-admin"]),
});

export const getUserSchema = responseSchema.merge(
   z.object({
      data: z.object({
         user: userSchema,
      }),
   })
);

export const authenticatedUserSchema = responseSchema.merge(
   z.object({
      data: z.object({
         user: userSchema,
         token: z.string(),
      }),
   })
);

export const allUsersResponseSchema = responseSchema.merge(
   z.object({
      data: z.object({
         totalUsers: z.number(),
         totalPages: z.number(),
         numberOfFetchedUsers: z.number(),
         users: z.array(userSchema),
      }),
   })
);

export type AuthenticateUserType = z.infer<typeof authenticatedUserSchema>;
export type AllUsersResponseType = z.infer<typeof allUsersResponseSchema>;
export type GetUserType = z.infer<typeof getUserSchema>;
export type UserType = z.infer<typeof userSchema>;
