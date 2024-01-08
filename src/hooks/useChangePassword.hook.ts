"use client";

import { useMutation } from "@tanstack/react-query";

import type { ResponseData, UseMutationArgs } from "@root/types";
import { axiosClient } from "@root/lib";

export async function changePassword({ values, token }: { values: { [key: string]: string }; token: string }) {
   const res = await axiosClient.put<ResponseData>("/user/change-password", values, {
      headers: { Authorization: `Bearer ${token}` },
   });
   return res.data;
}

export default function useChangePassword({ onSuccess, onError }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ values, token }: { values: { [key: string]: string }; token: string }) => changePassword({ values, token }),
      onSuccess,
      onError,
   });
}
