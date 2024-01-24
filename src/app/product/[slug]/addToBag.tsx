"use client";

import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingBag } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, toast } from "@root/components/ui";
import { addToBagFormSchema, type AddToBagFormType, type ShoppingBagResponseType } from "@root/validations";
import { getShoppingBagQueryKey } from "@root/constants";
import { useAddToBag } from "@root/hooks";

export interface AddToBagProps {
   productId: string;
   token: string;
   totalStock: number;
}

export default function AddToBag({ productId, token, totalStock }: AddToBagProps) {
   const queryClient = useQueryClient();
   const addToBagForm = useForm<AddToBagFormType>({
      resolver: zodResolver(addToBagFormSchema),
      defaultValues: { quantity: 1 },
   });

   function onSuccess(data: ShoppingBagResponseType) {
      queryClient.setQueryData([getShoppingBagQueryKey], () => data);
      toast({ title: data.message });
   }
   const { mutate: addToBagMutation, isPending } = useAddToBag({ onSuccess });

   function onAddToBag(values: AddToBagFormType) {
      if (isPending) return;
      if (values.quantity > totalStock) {
         addToBagForm.setError("quantity", { message: "Available stock: " + totalStock });
         return;
      }
      addToBagMutation({ token, values: { productId, quantity: values.quantity } });
   }

   return (
      <div className="my-6">
         <Form {...addToBagForm}>
            <form onSubmit={addToBagForm.handleSubmit(onAddToBag)}>
               <FormField
                  control={addToBagForm.control}
                  name="quantity"
                  render={({ field }) => (
                     <FormItem>
                        <div className="flex flex-wrap items-center space-y-4">
                           <FormLabel></FormLabel>
                           <FormControl>
                              <Input
                                 className="w-40 text-center rounded-none focus-visible:ring-0 border-custom-foreground"
                                 placeholder="Enter number of items...."
                                 {...field}
                              />
                           </FormControl>
                           <Button type="submit" className="ml-4" disabled={isPending}>
                              <ShoppingBag className="mr-3 w-4 h-4" />
                              Add to Bag
                           </Button>
                        </div>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </form>
         </Form>
      </div>
   );
}
