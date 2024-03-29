"use client";

import { useEffect, useState } from "react";

import { AdminSearch, AdminTable } from "@root/components/custom";
import { useGetAllUsersForAdmin } from "@root/hooks";
import type { UserRoleType } from "@root/types";
import UserActions from "./actions";
import Loading from "../loading";

const headContents = ["Name", "E-mail", "Role"];

export interface ParentComponentProps {
   role: UserRoleType;
   token: string;
}

export default function ParentComponent({ role, token }: ParentComponentProps) {
   const [value, setValue] = useState("");
   const [page, setPage] = useState(1);
   const [deferredValue, setDeferredValue] = useState("");

   const userRole = role === "user" ? "Regular" : role[0].toUpperCase() + role.substring(1);

   useEffect(() => {
      const timeout = setTimeout(() => {
         setDeferredValue(value);
      }, 750);

      return () => clearTimeout(timeout);
   }, [value]);

   const { data: response } = useGetAllUsersForAdmin({
      pageNumber: page,
      token,
      role,
      query: deferredValue,
   });
   if (!response) return <Loading />;

   const { totalPages, users } = response.data;

   const userTableContents = users.map((user) => {
      /**
       * trims the characters after first 6 characters and till the @ part
       * for example: angkushsahu2502@gmail.com becomes -> "angkus.....@gmail.com"
       * */
      const email = user.email.substring(0, 6) + "....." + user.email.substring(user.email.lastIndexOf("@"));
      return {
         name: user.name,
         email,
         role: user.role[0].toUpperCase() + user.role.substring(1),
         id: user.id,
      };
   });
   const bodyKeys = userTableContents[0] ? Object.keys(userTableContents[0]) : [];

   return (
      <div>
         <h1 className="font-semibold text-3xl">{userRole} Users</h1>
         <AdminSearch setValue={setValue} value={value} placeholder={`Search ${userRole} Users ....`} />
         <AdminTable
            bodyElements={userTableContents as unknown as Array<Record<string, string | number>>}
            bodyKeys={bodyKeys}
            headElements={headContents}
            currentPage={page}
            totalPages={totalPages}
            Actions={UserActions}
            setPage={setPage}
            parentPage="Users"
            token={token}
         />
      </div>
   );
}
