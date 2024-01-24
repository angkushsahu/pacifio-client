"use client";

import { useMutation } from "@tanstack/react-query";

import { getUserSchema, type GetUserType } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function updateUser({ values, token }: { values: unknown; token: string }) {
   const res = await axiosClient.put<GetUserType>("/user", values, { headers: { Authorization: `Bearer ${token}` } });

   const parsedResponse = getUserSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useUpdateUser({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ values, token }: { values: { [key: string]: string }; token: string }) => updateUser({ values, token }),
      onSuccess,
   });
}
