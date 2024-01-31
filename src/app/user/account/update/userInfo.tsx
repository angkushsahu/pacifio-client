"use client";

import { useGetMyAccount } from "@root/hooks";
import UpdateForm from "./updateForm";
import Loading from "./loading";

export default function UserInfo({ token }: { token: string }) {
   const { data: response } = useGetMyAccount({ enabled: true, token });
   if (!response) return <Loading />;
   const { data } = response;
   const { user } = data;

   return (
      <main className="min-h-section max-w-xl mx-auto px-5 pt-8 pb-12 flex flex-col justify-center">
         <h1 className="font-semibold text-3xl mb-6">Update Account</h1>
         <UpdateForm email={user.email} name={user.name} token={token} />;
      </main>
   );
}
