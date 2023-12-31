"use client";

import { useState } from "react";

import { Button, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@root/components/ui";
import type { OrderStatusType } from "@root/types";

export default function UpdateOrderStatus({ status }: { status: OrderStatusType }) {
   const [value, setValue] = useState<OrderStatusType>("processing");

   return (
      <div className="mt-6">
         <h2 className="text-xl font-medium">Update Order Status</h2>
         <div className="mt-4 flex items-center gap-x-4">
            <Select defaultValue={status} value={value} onValueChange={(e) => setValue(e as OrderStatusType)}>
               <SelectTrigger className="w-56 border-custom-foreground">
                  <SelectValue placeholder="Select order status" />
               </SelectTrigger>
               <SelectContent className="w-56 rounded-none">
                  <SelectGroup>
                     <SelectItem value="processing">Processing</SelectItem>
                     <SelectItem value="shipped">Shipped</SelectItem>
                     <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectGroup>
               </SelectContent>
            </Select>
            {status !== value ? <Button>Update</Button> : null}
         </div>
      </div>
   );
}
