"use client";

import { useMutation } from "@tanstack/react-query";

import { type ResponseType, responseSchema } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function deleteAddress({ id, token }: { token: string; id: string }) {
   const res = await axiosClient.delete<ResponseType>(`address/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = responseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useDeleteAddress({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ id, token }: { id: string; token: string }) => deleteAddress({ id, token }),
      onSuccess,
   });
}
