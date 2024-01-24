"use client";

import { useMutation } from "@tanstack/react-query";

import { responseSchema, type ResponseType } from "@root/validations";
import type { UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function deleteUserByAdmin({ token, userId }: { token: string; userId: string }) {
   const res = await axiosClient.delete<ResponseType>(`/user/admin/${userId}`, { headers: { Authorization: `Bearer ${token}` } });

   const parsedResponse = responseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useDeleteUserByAdmin({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ token, userId }: { token: string; userId: string }) => deleteUserByAdmin({ token, userId }),
      onSuccess,
   });
}
