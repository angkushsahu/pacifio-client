"use client";

import { useState } from "react";

import { Button, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@root/components/ui";
import type { UserRoleType } from "@root/types";

export default function UpdateUserRole({ role }: { role: UserRoleType }) {
   const [value, setValue] = useState<UserRoleType>("user");

   return (
      <div className="mt-6">
         <h2 className="text-xl font-medium">Update User Role</h2>
         <div className="mt-4 flex items-center gap-x-4">
            <Select defaultValue={role} value={value} onValueChange={(e) => setValue(e as UserRoleType)}>
               <SelectTrigger className="w-56 border-custom-foreground">
                  <SelectValue placeholder="Select user role" />
               </SelectTrigger>
               <SelectContent className="w-56 rounded-none">
                  <SelectGroup>
                     <SelectItem value="user">User</SelectItem>
                     <SelectItem value="admin">Admin</SelectItem>
                  </SelectGroup>
               </SelectContent>
            </Select>
            {role !== value ? <Button>Update</Button> : null}
         </div>
      </div>
   );
}
