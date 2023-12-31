"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@root/components/ui";
import { Button } from "@root/components/ui";
import Sidebar from "./sidebar";

export default function AdminSidebar() {
   const [open, setOpen] = useState(false);

   return (
      <>
         <Sheet defaultOpen={false} open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="xl:hidden">
               <Button variant="outline">
                  <Menu className="mr-2 w-5 h-5" /> Open Admin Navigation
               </Button>
            </SheetTrigger>
            <SheetContent side="left" className="xl:hidden p-0 bg-custom w-full sm:w-3/4 overflow-y-auto">
               <Sidebar responsive setOpen={setOpen} />
            </SheetContent>
         </Sheet>
         <Sidebar />
      </>
   );
}
