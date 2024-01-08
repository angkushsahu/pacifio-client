"use client";

import { useMutation } from "@tanstack/react-query";

import type { ResponseData, UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function deleteUser(token: string) {
   const res = await axiosClient.delete<ResponseData>("/user", { headers: { Authorization: `Bearer ${token}` } });
   return res.data;
}

export default function useDeleteUser({ onSuccess, onError }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ token }: { token: string }) => deleteUser(token),
      onSuccess,
      onError,
   });
}
