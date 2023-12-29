import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@root/components/ui";
import { updateAddressUrl } from "@root/constants/routes";

export interface AddressOptionsProps {
   addressId: string;
}

export default function AddressOptions({ addressId }: AddressOptionsProps) {
   return (
      <DropdownMenu>
         <div className="flex justify-end items-center">
            <DropdownMenuTrigger asChild>
               <div className="bg-custom hover:bg-custom-hover px-2 py-1 cursor-pointer">
                  <MoreHorizontal />
               </div>
            </DropdownMenuTrigger>
         </div>
         <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
               <Link href={`${updateAddressUrl}/${addressId}`} className="flex items-center w-full">
                  <Pencil className="mr-2 w-4 h-4" /> Edit
               </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
               <Trash className="mr-2 w-4 h-4" /> Delete
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
