"use client";

import { useState } from "react";

import { AdminSearch, AdminTable } from "@root/components/elements";
import TransactionActions from "./actions";

const headContents = ["Customer Mail", "Amount", "Payment Method", "Date and Time"];

const bodyContents = [
   ["angkushsahu2502@gmail.com", 29000, "**** 4242", "29th Sept, 2023"],
   ["angkushsahu2502@gmail.com", 29000, "**** 4242", "29th Sept, 2023"],
   ["angkushsahu2502@gmail.com", 29000, "**** 4242", "29th Sept, 2023"],
   ["angkushsahu2502@gmail.com", 29000, "**** 4242", "29th Sept, 2023"],
   ["angkushsahu2502@gmail.com", 29000, "**** 4242", "29th Sept, 2023"],
   ["angkushsahu2502@gmail.com", 29000, "**** 4242", "29th Sept, 2023"],
   ["angkushsahu2502@gmail.com", 29000, "**** 4242", "29th Sept, 2023"],
   ["angkushsahu2502@gmail.com", 29000, "**** 4242", "29th Sept, 2023"],
   ["angkushsahu2502@gmail.com", 29000, "**** 4242", "29th Sept, 2023"],
   ["angkushsahu2502@gmail.com", 29000, "**** 4242", "29th Sept, 2023"],
];

export default function ParentAdminTransactions() {
   const [value, setValue] = useState("");

   return (
      <div>
         <h1 className="font-semibold text-3xl">Transactions</h1>
         <AdminSearch setValue={setValue} value={value} placeholder={`Search Transactions ....`} />
         <AdminTable
            bodyElements={bodyContents}
            headElements={headContents}
            currentPage={1}
            totalPages={5}
            Actions={TransactionActions}
         />
      </div>
   );
}
