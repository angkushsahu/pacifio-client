import { z } from "zod";

export const signupFormSchema = z
   .object({
      name: z.string().min(1, { message: "Required field" }),
      email: z.string().min(1, { message: "Required field" }).email({ message: "Please enter a valid e-mail" }),
      password: z.string().min(1, { message: "Required field" }),
      confirmPassword: z.string().min(1, { message: "Required field" }),
   })
   .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });

export const loginFormSchema = z.object({
   email: z.string().min(1, { message: "Required field" }).email({ message: "Please enter a valid e-mail" }),
   password: z.string().min(1, { message: "Required field" }),
});

export const resetPasswordFormSchema = z
   .object({
      password: z.string().min(1, { message: "Required field" }),
      confirmPassword: z.string().min(1, { message: "Required field" }),
   })
   .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });

export const forgotPasswordFormSchema = z.object({
   email: z.string().min(1, { message: "Required field" }).email({ message: "Please enter a valid e-mail" }),
});

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordFormSchema>;
export type ResetPasswordFormType = z.infer<typeof resetPasswordFormSchema>;
export type SignupFormType = z.infer<typeof signupFormSchema>;
export type LoginFormType = z.infer<typeof loginFormSchema>;
