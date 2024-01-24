"use client";

import { useQuery } from "@tanstack/react-query";

import { type AllUsersResponseType, allUsersResponseSchema } from "@root/validations";
import { getAllUsersForAdminQueryKey } from "@root/constants";
import type { UserRoleType } from "@root/types";
import { axiosClient } from "@root/lib";

export interface IArgs {
   pageNumber: number;
   token: string;
   role: UserRoleType;
   query: string;
}

export async function getAllUsersForAdmin({ pageNumber, query, role, token }: IArgs) {
   const res = await axiosClient.get<AllUsersResponseType>(`/user/admin/all?page=${pageNumber}&query=${query}&role=${role}`, {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = allUsersResponseSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useGetAllUsersForAdmin({ pageNumber, query, role, token }: IArgs) {
   return useQuery({
      queryKey: [getAllUsersForAdminQueryKey, pageNumber, query, role],
      queryFn: () => getAllUsersForAdmin({ pageNumber, query, role, token }),
   });
}
