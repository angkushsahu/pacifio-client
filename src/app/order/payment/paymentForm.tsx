"use client";

import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@root/components/ui";
import { baseOrderSuccessUrl, getAllOrdersQueryKey, getOrderQueryKey, getShoppingBagQueryKey } from "@root/constants";
import { type PaymentFormType, paymentFormSchema, type OrderResponseType } from "@root/validations";
import { Button, Input, toast } from "@root/components/ui";
import { useCreateOrder, usePayment } from "@root/hooks";
import Loading from "./loading";

export interface PaymentFormProps {
   token: string;
   totalPrice: number;
   addressId: string;
   loading: boolean;
}

export default function PaymentForm({ addressId, loading, token, totalPrice }: PaymentFormProps) {
   if (loading) return <Loading />;
   const router = useRouter();
   const queryClient = useQueryClient();

   const paymentForm = useForm<PaymentFormType>({
      resolver: zodResolver(paymentFormSchema),
      defaultValues: { cardNumber: "", cvv: "", expiryDate: "" },
   });

   function onOrderSuccess(response: OrderResponseType) {
      const { id } = response.data.order;
      makePayment({ orderId: id, token });
      queryClient.invalidateQueries({ queryKey: [getAllOrdersQueryKey] });
      queryClient.setQueryData([getOrderQueryKey, id], () => response);
   }
   function onPaymentSuccess(response: OrderResponseType) {
      paymentForm.reset();
      toast({ title: response.message });
      queryClient.invalidateQueries({ queryKey: [getShoppingBagQueryKey] });
      router.replace(`${baseOrderSuccessUrl}?order_id=${response.data.order.id}`);
   }
   const { mutate: createOrder, isPending: pendingCreateOrder } = useCreateOrder({ onSuccess: onOrderSuccess });
   const { mutate: makePayment, isPending: pendingPayment } = usePayment({ onSuccess: onPaymentSuccess });

   function onPayment() {
      if (pendingCreateOrder || pendingPayment) return;
      createOrder({ token, values: { addressId } });
   }

   useEffect(() => {
      const value = paymentForm.getValues("expiryDate");
      const digitsOnly = value.replace(/\D/g, "");
      const formattedValue = digitsOnly.replace(/^(\d{2})(\d*)/, "$1 / $2");
      paymentForm.setValue("expiryDate", formattedValue);
      if (paymentForm.formState.touchedFields.expiryDate) paymentForm.trigger("expiryDate");
   }, [paymentForm.watch("expiryDate"), paymentForm.formState.touchedFields.expiryDate]);

   useEffect(() => {
      const value = paymentForm.getValues("cardNumber");
      const digitsOnly = value.replace(/\D/g, "");
      const formattedValue = digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 - ");
      paymentForm.setValue("cardNumber", formattedValue);
      if (paymentForm.formState.touchedFields.cardNumber) paymentForm.trigger("cardNumber");
   }, [paymentForm.watch("cardNumber"), paymentForm.formState.touchedFields.cardNumber]);

   return (
      <Form {...paymentForm}>
         <form onSubmit={paymentForm.handleSubmit(onPayment)} className="space-y-5">
            <FormField
               control={paymentForm.control}
               name="cardNumber"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Card Number</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. 4242 - 4242 - 4242 - 4242" {...field} />
                     </FormControl>
                     <FormDescription>Enter the 16-digit card number</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={paymentForm.control}
               name="cvv"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>CVV</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. 123" {...field} />
                     </FormControl>
                     <FormDescription>Enter the 3-digit number at the back of your card</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={paymentForm.control}
               name="expiryDate"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Expires on</FormLabel>
                     <FormControl>
                        <Input placeholder="MM / YYYY" {...field} />
                     </FormControl>
                     <FormDescription>Enter the card expiry date</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" className="w-full" disabled={pendingCreateOrder || pendingPayment}>
               Pay ₹ {totalPrice}
            </Button>
         </form>
      </Form>
   );
}
