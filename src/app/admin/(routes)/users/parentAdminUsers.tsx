"use client";

import { useState } from "react";

import { AdminSearch, AdminTable } from "@root/components/elements";
import type { UserRoleType } from "@root/types";
import UserActions from "./actions";

const headContents = ["Name", "E-mail", "Role"];

const bodyContents = [
   ["Abra ca Dabra Abra", "abracadabra11980@gmail.com", "Admin"],
   ["Abra ca Dabra Abra", "abracadabra11980@gmail.com", "Admin"],
   ["Abra ca Dabra Abra", "abracadabra11980@gmail.com", "Admin"],
   ["Abra ca Dabra Abra", "abracadabra11980@gmail.com", "Admin"],
   ["Abra ca Dabra Abra", "abracadabra11980@gmail.com", "Admin"],
   ["Abra ca Dabra Abra", "abracadabra11980@gmail.com", "Admin"],
   ["Abra ca Dabra Abra", "abracadabra11980@gmail.com", "Admin"],
   ["Abra ca Dabra Abra", "abracadabra11980@gmail.com", "Admin"],
   ["Abra ca Dabra Abra", "abracadabra11980@gmail.com", "Admin"],
   ["Abra ca Dabra Abra", "abracadabra11980@gmail.com", "Admin"],
];

export interface ParentAdminUsersProps {
   role: UserRoleType;
}

export default function ParentAdminUsers({ role }: ParentAdminUsersProps) {
   const [value, setValue] = useState("");
   const userRole = role[0].toUpperCase() + role.substring(1);
   return (
      <div>
         <h1 className="font-semibold text-3xl">{userRole} Users</h1>
         <AdminSearch setValue={setValue} value={value} placeholder={`Search ${userRole} Users ....`} />
         <AdminTable
            bodyElements={bodyContents}
            headElements={headContents}
            currentPage={1}
            totalPages={5}
            Actions={UserActions}
         />
      </div>
   );
}
