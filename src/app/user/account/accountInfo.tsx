"use client";

import { useSession } from "next-auth/react";

export default function AccountInfo() {
   const { data: session } = useSession();
   if (!session || !session.user) return <></>;

   return (
      <table className="block">
         <tbody className="block border-2 border-custom-marker divide-y-2 divide-custom-marker md:divide-y-0">
            <tr className="flex flex-col md:flex-row md:even:bg-custom">
               <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                  Name
               </td>
               <td className="w-full p-3 md:pl-4">{session.user.name}</td>
            </tr>
            <tr className="flex flex-col md:flex-row md:even:bg-custom">
               <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                  E-mail
               </td>
               <td className="w-full p-3 md:pl-4 break-all">{session.user.email}</td>
            </tr>
            <tr className="flex flex-col md:flex-row md:even:bg-custom">
               <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                  Role
               </td>
               <td className="w-full p-3 md:pl-4 capitalize">{session.user.role}</td>
            </tr>
            <tr className="flex flex-col md:flex-row md:even:bg-custom">
               <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                  Joined on
               </td>
               <td className="w-full p-3 md:pl-4">{session.user.createdAt}</td>
            </tr>
         </tbody>
      </table>
   );
}
