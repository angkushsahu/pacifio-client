import { z } from "zod";

export const addressFormSchema = z.object({
   contactNumber: z.string().min(9, { message: "Enter a valid phone number" }),
   location: z.string().min(1, { message: "Required field" }),
   city: z.string().min(1, { message: "Required field" }),
   state: z.string().min(1, { message: "Required field" }),
   pincode: z.string().min(1, { message: "Required field" }),
   country: z.string().min(1, { message: "Required field" }),
});

export type AddressFormType = z.infer<typeof addressFormSchema>;
