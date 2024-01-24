import { z } from "zod";

export const updateFormSchema = z.object({
   name: z.string().min(1, { message: "Required field" }),
   email: z.string().min(1, { message: "Required field" }).email({ message: "Please enter a valid e-mail" }),
});

export const changePasswordFormSchema = z
   .object({
      password: z.string().min(1, { message: "Required field" }),
      confirmPassword: z.string().min(1, { message: "Required field" }),
   })
   .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });

export type ChangePasswordFormType = z.infer<typeof changePasswordFormSchema>;
export type UpdateFormType = z.infer<typeof updateFormSchema>;
