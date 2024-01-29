"use client";

import { useGetMyAccount } from "@root/hooks";

export default function AccountInfo({ token }: { token: string }) {
   const { data: response } = useGetMyAccount({ enabled: true, token });

   return (
      <table className="block">
         <tbody className="block border-2 border-custom-marker divide-y-2 divide-custom-marker md:divide-y-0">
            <tr className="flex flex-col md:flex-row md:even:bg-custom">
               <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                  Name
               </td>
               <td className="w-full p-3 md:pl-4">{response?.data.user.name || "....."}</td>
            </tr>
            <tr className="flex flex-col md:flex-row md:even:bg-custom">
               <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                  E-mail
               </td>
               <td className="w-full p-3 md:pl-4 break-all">{response?.data.user.email || "....."}</td>
            </tr>
            <tr className="flex flex-col md:flex-row md:even:bg-custom">
               <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                  Role
               </td>
               <td className="w-full p-3 md:pl-4 capitalize">{response?.data.user.role || "....."}</td>
            </tr>
            <tr className="flex flex-col md:flex-row md:even:bg-custom">
               <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                  Joined on
               </td>
               <td className="w-full p-3 md:pl-4">{response?.data.user.createdAt || "....."}</td>
            </tr>
         </tbody>
      </table>
   );
}
