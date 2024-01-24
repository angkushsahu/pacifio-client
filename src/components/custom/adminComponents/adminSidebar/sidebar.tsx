"use client";

import type { Dispatch, SetStateAction } from "react";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@root/components/ui";
import { adminDashboardUrl, adminTransactionsUrl } from "@root/constants";
import adminNavigation from "./adminNavigationArray";
import { cn } from "@root/lib";

export interface SidebarProps {
   responsive?: boolean;
   setOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ responsive, setOpen }: SidebarProps) {
   function closeNavigation() {
      if (setOpen) setOpen(false);
   }

   return (
      <aside className={cn("p-4 bg-custom", { "hidden xl:block max-w-72 w-full": !responsive })}>
         <div className="pb-3 border-b-2 border-b-custom-marker">
            <p className="text-xl font-semibold mb-1">PACIFIO</p>
            <p className="flex items-center">
               <ShieldCheck className="mr-2 w-5 h-5" /> ADMIN DASHBOARD
            </p>
         </div>
         <nav>
            <Link
               href={adminDashboardUrl}
               className="font-medium block hover:bg-custom-hover px-2 py-3"
               onClick={closeNavigation}
            >
               Dashboard
            </Link>
            <Accordion type="multiple" className="w-full">
               {adminNavigation.map((navigation) => (
                  <AccordionItem value={navigation.title} key={navigation.title}>
                     <AccordionTrigger className="hover:no-underline hover:bg-custom-hover px-2 py-3">
                        {navigation.title}
                     </AccordionTrigger>
                     {navigation.links.map(({ Icon, link, type }) => (
                        <AccordionContent
                           key={type}
                           className="hover:no-underline hover:bg-custom-hover pb-0"
                           onClick={closeNavigation}
                           asChild
                        >
                           <Link href={link} className="flex items-center px-2 py-3 ml-3">
                              <Icon className="mr-3 w-5 h-5" />
                              {type}
                           </Link>
                        </AccordionContent>
                     ))}
                  </AccordionItem>
               ))}
            </Accordion>
            <Link
               href={adminTransactionsUrl}
               className="font-medium block hover:bg-custom-hover px-2 py-3"
               onClick={closeNavigation}
            >
               Transactions
            </Link>
         </nav>
      </aside>
   );
}
