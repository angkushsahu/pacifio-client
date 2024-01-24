"use client";

import { useMutation } from "@tanstack/react-query";

import { productResponseSchema, type ProductResponseType } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function updateProduct({ values, token, id }: { values: unknown; token: string; id: string }) {
   const res = await axiosClient.put<ProductResponseType>(`/product/admin/${id}`, values, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = productResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useUpdateProduct({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ values, token, id }: { values: unknown; token: string; id: string }) => updateProduct({ values, token, id }),
      onSuccess,
   });
}
