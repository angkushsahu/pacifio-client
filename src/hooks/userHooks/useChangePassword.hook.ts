"use client";

import { useMutation } from "@tanstack/react-query";

import { responseSchema, type ResponseType } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function changePassword({ values, token }: { values: unknown; token: string }) {
   const res = await axiosClient.put<ResponseType>("/user/change-password", values, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = responseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useChangePassword({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ values, token }: { values: { [key: string]: string }; token: string }) => changePassword({ values, token }),
      onSuccess,
   });
}
