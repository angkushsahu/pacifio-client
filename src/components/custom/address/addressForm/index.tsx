"use client";

import { type UseFormReturn, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { type AddressFormType, type AddressResponseType, addressFormSchema, AllAddressResponseType } from "@root/validations";
import { allAddressUrl, getAddressQueryKey, getAllAddressQueryKey, shippingUrl } from "@root/constants";
import { useCreateAddress, useUpdateAddress } from "@root/hooks";
import { toast } from "@root/components/ui";
import Form from "./form";

export type AddressFormProps = AddressFormType & { isCreationRoute?: boolean; id?: string; token: string };

export interface FormComponentProps {
   addressForm: UseFormReturn<AddressFormType, any, undefined>;
   onAddressEdit: (values: AddressFormType) => void;
   disabled: boolean;
}

export default function AddressForm(props: AddressFormProps) {
   const router = useRouter();
   const queryClient = useQueryClient();
   const searchParams = useSearchParams();
   const isShippingRoute = searchParams.get("shipping");
   const { contactNumber, country, city, location, pincode, state } = props;

   const addressForm = useForm<AddressFormType>({
      resolver: zodResolver(addressFormSchema),
      defaultValues: { contactNumber, country, city, location, pincode, state },
   });

   function onSuccess(response: AddressResponseType) {
      queryClient.setQueryData([getAllAddressQueryKey], function (presentAddresses: AllAddressResponseType) {
         if (!presentAddresses?.data) {
            return {
               ...presentAddresses?.data,
               addresses: [response.data.address],
               totalAddresses: presentAddresses?.data.totalAddresses ?? 1,
            };
         }
         let { addresses, totalAddresses } = presentAddresses.data;
         let condition = false;
         for (let i = 0; i < addresses.length; i++) {
            if (addresses[i].id !== props.id) continue;

            addresses[i] = response.data.address;
            condition = true;
            break;
         }

         if (!condition) addresses.push(response.data.address);
         if (!condition) totalAddresses++;

         return {
            ...presentAddresses,
            data: { ...presentAddresses.data, addresses, totalAddresses },
         };
      });

      queryClient.setQueryData([getAddressQueryKey, props.id], () => response);

      if (props.isCreationRoute) addressForm.reset();
      toast({ title: response.message });

      if (isShippingRoute === "true") router.push(shippingUrl);
      else router.push(allAddressUrl);
   }
   const { mutate: createAddress, isPending: creationPending } = useCreateAddress({ onSuccess });
   const { mutate: updateAddress, isPending: updationPending } = useUpdateAddress({ onSuccess });

   function onAddressEdit(values: AddressFormType) {
      if (creationPending || updationPending) return;

      const { token } = props;
      if (props.isCreationRoute) createAddress({ values, token });
      else if (props.id) updateAddress({ values, token, id: props.id });
   }

   return <Form addressForm={addressForm} disabled={creationPending || updationPending} onAddressEdit={onAddressEdit} />;
}
