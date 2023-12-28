"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingBag } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@root/components/ui";

const MAX_VALUE = 5;

const addToBagFormSchema = z.object({
   totalItems: z.coerce.number().gte(1, { message: "Minimum value: 1" }),
});

export type AddToBagFormType = z.infer<typeof addToBagFormSchema>;

export default function AddToBag() {
   const addToBagForm = useForm<AddToBagFormType>({
      resolver: zodResolver(addToBagFormSchema),
      defaultValues: { totalItems: 1 },
   });

   function onAddToBag(values: AddToBagFormType) {
      if (values.totalItems > MAX_VALUE) addToBagForm.setError("totalItems", { message: "Maximum value: " + MAX_VALUE });
   }

   return (
      <div className="my-6">
         <Form {...addToBagForm}>
            <form onSubmit={addToBagForm.handleSubmit(onAddToBag)}>
               <FormField
                  control={addToBagForm.control}
                  name="totalItems"
                  render={({ field }) => (
                     <FormItem>
                        <div className="flex items-center">
                           <FormLabel></FormLabel>
                           <FormControl>
                              <Input
                                 className="w-40 text-center rounded-none focus-visible:ring-0 border-custom-foreground"
                                 placeholder="Enter number of items...."
                                 {...field}
                              />
                           </FormControl>
                           <Button type="submit" className="ml-4">
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
