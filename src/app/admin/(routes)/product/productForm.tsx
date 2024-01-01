"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@root/components/ui";
import { Button, Input, Textarea } from "@root/components/ui";
import type { CategoryType } from "@root/types";
import SelectCategory from "./(product-creation)/create/selectCategory";

const createProductSchema = z.object({
   name: z.string().min(5, { message: "Minimum 5 characters" }),
   category: z.enum(["mouse", "cooling-pad", "mouse-pad", "keyboard", "headset", ""]),
   price: z.coerce.number().gte(1, { message: "Choose a valid price" }),
   stock: z.coerce.number().gte(1, { message: "Choose a valid stock" }),
   description: z.string().min(1, { message: "Required Field" }),
});

export type CreateProductType = z.infer<typeof createProductSchema>;

export interface ProductInfoProps extends CreateProductType {
   isCreateRoute?: true;
}

export default function ProductInfo({ category, description, name, price, stock, isCreateRoute }: ProductInfoProps) {
   const createProductForm = useForm<CreateProductType>({
      resolver: zodResolver(createProductSchema),
      defaultValues: { category, description, name, price, stock },
   });

   function onProductCreation(values: CreateProductType) {
      if (!values.category) {
         createProductForm.setError("category", { message: "Required field" });
         return;
      }
      console.log(values);
   }

   function setCategoryField(value: CategoryType) {
      createProductForm.setValue("category", value);
   }

   useEffect(
      function () {
         if (createProductForm.formState.touchedFields.category && !createProductForm.getValues("category")) {
            createProductForm.setError("category", { message: "Required field" });
         } else if (createProductForm.getValues("category")) {
            createProductForm.clearErrors("category");
         }
      },
      [createProductForm.watch("category")]
   );

   return (
      <Form {...createProductForm}>
         <form onSubmit={createProductForm.handleSubmit(onProductCreation)} className="space-y-5">
            <FormField
               control={createProductForm.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Product Name</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. Awesome keyboard" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={createProductForm.control}
               name="category"
               render={() => (
                  <FormItem>
                     <FormLabel>Product Category</FormLabel>
                     <FormControl>
                        <SelectCategory setCategory={setCategoryField} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={createProductForm.control}
               name="price"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Product Price</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. 100" {...field} />
                     </FormControl>
                     <FormDescription>
                        Supports numeric values, <strong>do not </strong> put any symbol like ₹, $ etc
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={createProductForm.control}
               name="stock"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Product Stock</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. 100" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={createProductForm.control}
               name="description"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>More about this product</FormLabel>
                     <FormControl>
                        <Textarea placeholder="e.g. This keyboard has rgb lights etc ....." {...field} className="min-h-44" />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" className="w-full">
               {isCreateRoute ? "Create" : "Update"} Product
            </Button>
         </form>
      </Form>
   );
}
