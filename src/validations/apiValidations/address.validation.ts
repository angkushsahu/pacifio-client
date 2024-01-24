import { z } from "zod";

import { addressFormSchema } from "../formValidations/addressForm.validation";
import { responseSchema } from "./response.validation";
import { userSchema } from "./user.validation";

export const addressSchema = addressFormSchema.merge(
   z.object({
      id: z.string(),
      user: userSchema,
   })
);

export const addressResponseSchema = responseSchema.merge(
   z.object({
      data: z.object({
         address: addressSchema,
      }),
   })
);

export const allAddressResponseSchema = responseSchema.merge(
   z.object({
      data: z.object({
         addresses: z.array(addressSchema),
         totalAddresses: z.number(),
      }),
   })
);

export type AllAddressResponseType = z.infer<typeof allAddressResponseSchema>;
export type AddressResponseType = z.infer<typeof addressResponseSchema>;
export type AddressType = z.infer<typeof addressSchema>;
