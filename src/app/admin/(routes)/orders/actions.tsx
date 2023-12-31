import { MoreHorizontal, Package } from "lucide-react";
import Link from "next/link";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@root/components/ui";
import { baseAdminViewOrderUrl } from "@root/constants/routes";

export default function OrderActions({ id }: { id: string }) {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <div className="flex justify-end lg:justify-start w-7 ml-auto lg:mr-auto lg:ml-0">
               <MoreHorizontal className="cursor-pointer" />
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <DropdownMenuItem asChild className="cursor-pointer">
               <Link href={`${baseAdminViewOrderUrl}/${id}`}>
                  <Package className="mr-2 h-4 w-4" />
                  <span>View Order</span>
               </Link>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
