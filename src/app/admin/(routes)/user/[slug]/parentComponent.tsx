"use client";

import UpdateUserRole from "./updateUserRole";
import { useGetUser } from "@root/hooks";
import Loading from "../../loading";

export default function ParentComponent({ token, userId }: { token: string; userId: string }) {
   const { data: response } = useGetUser({ enabled: true, token, userId });
   if (!response) return <Loading />;
   const { user } = response.data;

   return (
      <div>
         <h1 className="font-semibold text-3xl mb-4">User Account</h1>
         <table className="block">
            <tbody className="block border-2 border-custom-marker divide-y-2 divide-custom-marker md:divide-y-0">
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     Name
                  </td>
                  <td className="w-full p-3 md:pl-4">{user.name}</td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     E-mail
                  </td>
                  <td className="w-full p-3 md:pl-4 break-all">{user.email}</td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     Role
                  </td>
                  <td className="w-full p-3 md:pl-4">{user.role[0].toUpperCase() + user.role.substring(1)}</td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     Joined on
                  </td>
                  <td className="w-full p-3 md:pl-4">{user.createdAt}</td>
               </tr>
            </tbody>
         </table>
         {user.role === "super-admin" ? <UpdateUserRole role={user.role} token={token} userId={userId} /> : null}
      </div>
   );
}
