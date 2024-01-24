import { Menu } from "lucide-react";
import Link from "next/link";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@root/components/ui";
import { authenticatedItems, commonNavItems, unAuthenticatedLinks } from "./linkArrays";
import SearchModal from "../searchModal";

export default function NavAndSearch({ isAuth }: { isAuth: boolean }) {
   const navItems = [...commonNavItems, ...(isAuth ? authenticatedItems : unAuthenticatedLinks)];

   return (
      <div className="order-1 md:order-none flex items-center gap-x-3 sm:gap-x-4">
         {/* Dropdown menu -- start */}
         <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full bg-neutral-900 p-2">
               <Menu className="text-white w-4 h-4 sm:w-5 sm:h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="p-3 shadow-lg mr-8 md:mr-0">
               <DropdownMenuGroup className="hidden md:block">
                  {commonNavItems.map((navItem) => (
                     <Link href={navItem.link} key={navItem.title}>
                        <DropdownMenuItem className="py-2 pr-10 cursor-pointer">
                           <navItem.Icon className="mr-2 w-5 h-5" />
                           <span>{navItem.title}</span>
                        </DropdownMenuItem>
                     </Link>
                  ))}
               </DropdownMenuGroup>
               <DropdownMenuGroup className="block md:hidden">
                  {navItems.map((navItem) => (
                     <Link href={navItem.link} key={navItem.title}>
                        <DropdownMenuItem className="py-2 pr-10 cursor-pointer">
                           <navItem.Icon className="mr-2 w-5 h-5" />
                           <span>{navItem.title}</span>
                        </DropdownMenuItem>
                     </Link>
                  ))}
               </DropdownMenuGroup>
            </DropdownMenuContent>
         </DropdownMenu>
         {/* Dropdown menu -- end */}
         <SearchModal />
      </div>
   );
}
