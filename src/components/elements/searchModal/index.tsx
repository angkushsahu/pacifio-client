"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@root/components/ui/dialog";
import { Button } from "@root/components/ui";
import SearchForm from "./searchForm";

export default function SearchModal() {
   const [open, setOpen] = useState(false);

   return (
      <Dialog defaultOpen={false} open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button
               variant="outline"
               size="icon"
               className="rounded-full -order-1 md:order-none border-none bg-custom hover:bg-custom-hover"
            >
               <Search className="w-4 h-4 sm:w-6 sm:h-6" />
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[31.25rem] w-11/12 max-h-[80vh] overflow-y-auto p-0 pt-6">
            <DialogHeader className="px-6">
               <DialogTitle className="text-2xl">Search Menu</DialogTitle>
            </DialogHeader>
            <SearchForm setOpen={setOpen} />
         </DialogContent>
      </Dialog>
   );
}
