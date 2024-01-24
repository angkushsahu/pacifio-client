"use client";

import { useMutation } from "@tanstack/react-query";

import { productResponseSchema, type ProductResponseType } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function createProduct({ values, token }: { values: unknown; token: string }) {
   const res = await axiosClient.post<ProductResponseType>("/product/admin/create", values, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = productResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useCreateProduct({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ values, token }: { values: unknown; token: string }) => createProduct({ values, token }),
      onSuccess,
   });
}
