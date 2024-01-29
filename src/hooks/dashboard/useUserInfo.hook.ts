"use client";

import { useQuery } from "@tanstack/react-query";

import { userInfoSchema, type UserInfoType } from "@root/validations";
import { getUserInfoQueryKey } from "@root/constants";
import { axiosClient } from "@root/lib";

export async function getUserInfo({ token }: { token: string }) {
   const res = await axiosClient.get<UserInfoType>("user/admin/info", {
      headers: { Authorization: `Bearer ${token}` },
   });

   const parsedResponse = userInfoSchema.safeParse(res?.data);
   if (parsedResponse.success) return parsedResponse.data;
   throw new Error("Data type not matching");
}

export default function useGetUserInfo({ enabled, token }: { enabled: boolean; token: string }) {
   return useQuery({
      queryKey: [getUserInfoQueryKey],
      queryFn: () => getUserInfo({ token }),
      enabled,
   });
}
