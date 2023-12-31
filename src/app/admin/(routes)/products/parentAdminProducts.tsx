"use client";

import { useState } from "react";

import { AdminSearch, AdminTable } from "@root/components/elements";
import type { ProductStockType } from "@root/types";
import isOutofStock from "./isOutofStock";
import ProductActions from "./actions";

const headContents = ["Name", "Price", "Category", "Stock"];

const bodyContents = [
   ["Abra ca Dabra Abra", 29000, "Cooling Pads", 1000],
   ["Abra ca Dabra Abra", 29000, "Cooling Pads", 1000],
   ["Abra ca Dabra Abra", 29000, "Cooling Pads", 1000],
   ["Abra ca Dabra Abra", 29000, "Cooling Pads", 1000],
   ["Abra ca Dabra Abra", 29000, "Cooling Pads", 1000],
   ["Abra ca Dabra Abra", 29000, "Cooling Pads", 1000],
   ["Abra ca Dabra Abra", 29000, "Cooling Pads", 1000],
   ["Abra ca Dabra Abra", 29000, "Cooling Pads", 1000],
   ["Abra ca Dabra Abra", 29000, "Cooling Pads", 1000],
   ["Abra ca Dabra Abra", 29000, "Cooling Pads", 1000],
];

export interface ParentAdminProductsProps {
   stock: ProductStockType;
}

export default function ParentAdminProducts({ stock }: ParentAdminProductsProps) {
   const [value, setValue] = useState("");

   return (
      <div>
         <h1 className="font-semibold text-3xl">{isOutofStock(stock)} Products</h1>
         <AdminSearch setValue={setValue} value={value} placeholder={`Search ${isOutofStock(stock)} Products ....`} />
         <AdminTable
            bodyElements={bodyContents}
            headElements={headContents}
            currentPage={1}
            totalPages={5}
            Actions={ProductActions}
         />
      </div>
   );
}
