"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, toast } from "@root/components/ui";
import { type AddressFormType, type AddressResponseType, addressFormSchema } from "@root/validations";
import { useCreateAddress, useUpdateAddress } from "@root/hooks";
import { allAddressUrl } from "@root/constants";

export type AddressFormProps = AddressFormType & { isCreationRoute?: boolean; id?: string; token: string };

export default function AddressForm(props: AddressFormProps) {
   const router = useRouter();
   const { contactNumber, country, city, location, pincode, state } = props;

   const addressForm = useForm<AddressFormType>({
      resolver: zodResolver(addressFormSchema),
      defaultValues: { contactNumber, country, city, location, pincode, state },
   });

   function onSuccess(data: AddressResponseType) {
      if (props.isCreationRoute) addressForm.reset();
      toast({ title: data.message });
      router.push(allAddressUrl);
   }
   const { mutate: createAddress, isPending: creationPending } = useCreateAddress({ onSuccess });
   const { mutate: updateAddress, isPending: updationPending } = useUpdateAddress({ onSuccess });

   function onAddressEdit(values: AddressFormType) {
      if (creationPending || updationPending) return;

      const { token } = props;
      if (props.isCreationRoute) createAddress({ values, token });
      else if (props.id) updateAddress({ values, token, id: props.id });
   }

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
            <Button type="submit" className="w-full" disabled={creationPending || updationPending}>
               Submit
            </Button>
         </form>
      </Form>
   );
}
