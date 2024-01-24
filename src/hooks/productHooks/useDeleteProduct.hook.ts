"use client";

import { useMutation } from "@tanstack/react-query";

import { responseSchema, type ResponseType } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function deleteProduct({ token, id }: { token: string; id: string }) {
   const res = await axiosClient.delete<ResponseType>(`/product/admin/${id}`, { headers: { Authorization: `Bearer ${token}` } });

   const parsedResponse = responseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useDeleteProduct({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ token, id }: { token: string; id: string }) => deleteProduct({ token, id }),
      onSuccess,
   });
}
