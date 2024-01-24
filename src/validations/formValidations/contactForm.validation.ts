import { z } from "zod";

export const contactFormSchema = z.object({
   name: z.string().min(1, { message: "Required field" }),
   email: z.string().min(1, { message: "Required field" }).email({ message: "Please enter a valid e-mail" }),
   subject: z.string().min(5, { message: "Minimum 5 characters" }),
   message: z.string().min(20, { message: "Minimum 20 characters" }),
});

export type ContactFormType = z.infer<typeof contactFormSchema>;
