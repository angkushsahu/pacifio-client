"use client";

import { useMutation } from "@tanstack/react-query";

import { getUserSchema, type GetUserType } from "@root/validations";
import type { UseMutationArgs, UserRoleType } from "@root/types";
import { axiosClient } from "@root/lib";

export interface UpdateRoleArgs {
   token: string;
   userId: string;
   role: UserRoleType;
}

export async function updateRole({ token, userId, role }: UpdateRoleArgs) {
   const res = await axiosClient.put<GetUserType>(
      `/user/admin/${userId}`,
      { role },
      { headers: { Authorization: `Bearer ${token}` } }
   );

   const parsedResponse = getUserSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useUpdateRole({ onSuccess }: UseMutationArgs) {
   return useMutation({
      mutationFn: ({ token, userId, role }: UpdateRoleArgs) => updateRole({ token, userId, role }),
      onSuccess,
   });
}
