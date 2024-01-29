"use client";

import { useRouter } from "next/navigation";
import { Info } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@root/components/ui";
import { shippingUrl, shoppingBagUrl } from "@root/constants";
import { useGetAddress, useGetBag } from "@root/hooks";
import PaymentForm from "./paymentForm";

export interface CheckQueryValidationProps {
   token: string;
   shippingId: string;
}

export default function CheckQueryValidation({ shippingId, token }: CheckQueryValidationProps) {
   const router = useRouter();
   const { data: addressResponse, isError: addressError } = useGetAddress({ enabled: true, id: shippingId, token });
   const { data: shoppingBagResponse, isError: shoppingBagError } = useGetBag({ enabled: true, token });
   if (addressError) router.replace(shippingUrl);
   if (shoppingBagError) router.replace(shoppingBagUrl);

   return (
      <main className="min-h-section grid place-content-center grid-cols-1 max-w-xl mx-auto px-5 pt-8 pb-12">
         <Alert className="shadow-md bg-muted">
            <Info className="h-4 w-4" />
            <AlertTitle className="mb-2">Important</AlertTitle>
            <AlertDescription>
               You can enter your card details freely. We do not intend to deduct money or save your card details.
            </AlertDescription>
         </Alert>
         <h1 className="font-semibold text-3xl my-6">Payment</h1>
         <PaymentForm
            totalPrice={shoppingBagResponse?.data.shoppingBag.totalPrice as number}
            token={token}
            addressId={shippingId}
            loading={!addressResponse || !shoppingBagResponse}
         />
      </main>
   );
}
