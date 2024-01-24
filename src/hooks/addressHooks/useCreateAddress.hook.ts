"use client";

import { useMutation } from "@tanstack/react-query";

import { addressResponseSchema, type AddressResponseType } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function createAddress({ token, values }: { values: unknown; token: string }) {
   const res = await axiosClient.post<AddressResponseType>("/address/create", values, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = addressResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useCreateAddress({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ token, values }: { token: string; values: unknown }) => createAddress({ values, token }),
      onSuccess,
   });
}
