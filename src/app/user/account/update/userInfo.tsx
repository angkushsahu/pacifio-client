"use client";

import { useGetMyAccount } from "@root/hooks";
import UpdateForm from "./updateForm";
import Loading from "./loading";

export default function UserInfo({ token }: { token: string }) {
   const { data: response } = useGetMyAccount({ enabled: true, token });
   if (!response) return <Loading />;
   const { data } = response;
   const { user } = data;

   return <UpdateForm email={user.email} name={user.name} token={token} />;
}
