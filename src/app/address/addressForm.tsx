"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@root/components/ui";

const addressFormSchema = z.object({
   contactNumber: z.string().min(9, { message: "Enter a valid phone number" }),
   location: z.string().min(1, { message: "Required field" }),
   city: z.string().min(1, { message: "Required field" }),
   state: z.string().min(20, { message: "Required field" }),
   pincode: z.coerce.number().min(1, { message: "Required field" }),
   country: z.string().min(1, { message: "Required field" }),
});

export type AddressFormType = z.infer<typeof addressFormSchema>;

export default function AddressForm(props: AddressFormType) {
   const { contactNumber, country, city, location, pincode, state } = props;
   const addressForm = useForm<AddressFormType>({
      resolver: zodResolver(addressFormSchema),
      defaultValues: { contactNumber, country, city, location, pincode, state },
   });

   function onAddressEdit(values: AddressFormType) {}

   return (
      <Form {...addressForm}>
         <form onSubmit={addressForm.handleSubmit(onAddressEdit)} className="space-y-6">
            <FormField
               control={addressForm.control}
               name="contactNumber"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Contact Number</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. xxxx-yyy-zzz" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={addressForm.control}
               name="location"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Location</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. abc colony, xyz road, some random suffix" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={addressForm.control}
               name="city"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>City</FormLabel>
                     <FormControl>
                        <Input placeholder="City in which you live" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={addressForm.control}
               name="state"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>State</FormLabel>
                     <FormControl>
                        <Input placeholder="State in which you live" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={addressForm.control}
               name="pincode"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Pincode</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. 123456" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={addressForm.control}
               name="country"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Country</FormLabel>
                     <FormControl>
                        <Input placeholder="Country in which you live" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" className="w-full">
               Submit
            </Button>
         </form>
      </Form>
   );
}
