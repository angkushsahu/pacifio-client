"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { Button, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, toast } from "@root/components/ui";
import { getAllUsersForAdminQueryKey, getUserQueryKey } from "@root/constants";
import type { GetUserType } from "@root/validations";
import type { UserRoleType } from "@root/types";
import { useUpdateRole } from "@root/hooks";

export interface UpdateUserRoleProps {
   role: UserRoleType;
   token: string;
   userId: string;
}

export default function UpdateUserRole({ role, token, userId }: UpdateUserRoleProps) {
   const queryClient = useQueryClient();
   const [value, setValue] = useState<UserRoleType>("user");

   function onSuccess(response: GetUserType) {
      toast({ title: response.message });
      queryClient.invalidateQueries({ queryKey: [getAllUsersForAdminQueryKey] });
      queryClient.setQueryData([getUserQueryKey, userId], () => response);
   }
   const { mutate: updateRole, isPending } = useUpdateRole({ onSuccess });

   function onRoleChange() {
      if (isPending) return;
      updateRole({ role: value, token, userId });
   }

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
            {role !== value ? (
               <Button onClick={onRoleChange} disabled={isPending}>
                  Update
               </Button>
            ) : null}
         </div>
      </div>
   );
}
