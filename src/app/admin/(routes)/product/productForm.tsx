"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, toast } from "@root/components/ui";
import { createProductSchema, type CreateProductType, type ProductResponseType } from "@root/validations";
import { baseAdminUploadProductImageUrl, getProductQueryKey } from "@root/constants";
import SelectCategory from "./(product-creation)/create/selectCategory";
import { useCreateProduct, useUpdateProduct } from "@root/hooks";
import { Button, Input, Textarea } from "@root/components/ui";
import { useQueryClient } from "@tanstack/react-query";
import type { CategoryType } from "@root/types";

export interface ProductInfoProps extends CreateProductType {
   isCreateRoute?: true;
   productId?: string;
   token: string;
}

export default function ProductInfo(props: ProductInfoProps) {
   const queryClient = useQueryClient();
   const router = useRouter();
   const { category, description, name, price, stock, isCreateRoute, token, productId } = props;

   const productForm = useForm<CreateProductType>({
      resolver: zodResolver(createProductSchema),
      defaultValues: { category, description, name, price, stock },
   });

   function onSuccess(response: ProductResponseType) {
      toast({ title: response.message });
      if (isCreateRoute) {
         productForm.reset();
         router.push(`${baseAdminUploadProductImageUrl}/${response.data.product.id}`);
      } else queryClient.setQueryData([getProductQueryKey, response.data.product.id], () => response);
   }
   const { mutate: createProduct, isPending: creationPending } = useCreateProduct({ onSuccess });
   const { mutate: updateProduct, isPending: updationPending } = useUpdateProduct({ onSuccess });

   function onProductEdit(values: CreateProductType) {
      if (creationPending || updationPending) return;
      if (!values.category) {
         productForm.setError("category", { message: "Required field" });
         return;
      }

      if (isCreateRoute) createProduct({ values, token });
      else if (productId) updateProduct({ values, token, id: productId });
   }

   function setCategoryField(value: CategoryType) {
      productForm.setValue("category", value);
   }

   useEffect(
      function () {
         if (productForm.formState.touchedFields.category && !productForm.getValues("category")) {
            productForm.setError("category", { message: "Required field" });
         } else if (productForm.getValues("category")) {
            productForm.clearErrors("category");
         }
      },
      [productForm.watch("category")]
   );

   return (
      <Form {...productForm}>
         <form onSubmit={productForm.handleSubmit(onProductEdit)} className="space-y-5">
            <FormField
               control={productForm.control}
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
               control={productForm.control}
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
               control={productForm.control}
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
               control={productForm.control}
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
               control={productForm.control}
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
            <Button type="submit" className="w-full" disabled={creationPending || updationPending}>
               {isCreateRoute ? "Create" : "Update"} Product
            </Button>
         </form>
      </Form>
   );
}
