"use client";

import { useState } from "react";

import { AdminSearch, AdminTable } from "@root/components/custom";
import type { OrderStatusType } from "@root/types";
import OrderActions from "./actions";

const headContents = ["Order Date", "Total Price", "Order Status", "Ordered On", "Customer Mail"];

const bodyContents = [
   ["17 Feb, 2019", 2050, "Processing", "26th July, 2019", "abracadabra11980@gmail.com"],
   ["17 Feb, 2019", 2050, "Processing", "26th July, 2019", "abracadabra11980@gmail.com"],
   ["17 Feb, 2019", 2050, "Processing", "26th July, 2019", "abracadabra11980@gmail.com"],
   ["17 Feb, 2019", 2050, "Processing", "26th July, 2019", "abracadabra11980@gmail.com"],
   ["17 Feb, 2019", 2050, "Processing", "26th July, 2019", "abracadabra11980@gmail.com"],
   ["17 Feb, 2019", 2050, "Processing", "26th July, 2019", "abracadabra11980@gmail.com"],
   ["17 Feb, 2019", 2050, "Processing", "26th July, 2019", "abracadabra11980@gmail.com"],
   ["17 Feb, 2019", 2050, "Processing", "26th July, 2019", "abracadabra11980@gmail.com"],
   ["17 Feb, 2019", 2050, "Processing", "26th July, 2019", "abracadabra11980@gmail.com"],
   ["17 Feb, 2019", 2050, "Processing", "26th July, 2019", "abracadabra11980@gmail.com"],
];

export interface ParentComponentProps {
   status: OrderStatusType;
}

export default function ParentComponent({ status }: ParentComponentProps) {
   const [value, setValue] = useState("");
   const orderStatus = status[0].toUpperCase() + status.substring(1);

   return (
      <div>
         <h1 className="font-semibold text-3xl">{orderStatus} Orders</h1>
         <AdminSearch setValue={setValue} value={value} placeholder={`Search ${orderStatus} Orders ....`} />
         <AdminTable
            bodyElements={bodyContents}
            headElements={headContents}
            currentPage={1}
            totalPages={5}
            Actions={OrderActions}
         />
      </div>
   );
}
