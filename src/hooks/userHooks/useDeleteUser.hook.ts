"use client";

import { useMutation } from "@tanstack/react-query";

import { responseSchema, type ResponseType } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function deleteUser(token: string) {
   const res = await axiosClient.delete<ResponseType>("/user", { headers: { Authorization: `Bearer ${token}` } });

   const parsedResponse = responseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useDeleteUser({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ token }: { token: string }) => deleteUser(token),
      onSuccess,
   });
}
