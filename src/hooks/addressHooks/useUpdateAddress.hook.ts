"use client";

import { useMutation } from "@tanstack/react-query";

import { type AddressResponseType, addressResponseSchema } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function updateAddress({ token, values, id }: { values: unknown; token: string; id: string }) {
   const res = await axiosClient.put<AddressResponseType>(`address/${id}`, values, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = addressResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useUpdateAddress({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ token, values, id }: { values: unknown; token: string; id: string }) => updateAddress({ values, id, token }),
      onSuccess,
   });
}
