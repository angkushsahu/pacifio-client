"use client";

import { useMutation } from "@tanstack/react-query";

import { type ProductImageResponseType, productImageResponseSchema } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function addProductImage({ values, token, id }: { values: unknown; token: string; id: string }) {
   const res = await axiosClient.post<ProductImageResponseType>(`/product/admin/${id}/image`, values, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = productImageResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useAddProductImage({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ values, token, id }: { values: unknown; token: string; id: string }) =>
         addProductImage({ values, token, id }),
      onSuccess,
   });
}
