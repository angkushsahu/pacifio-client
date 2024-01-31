"use client";

import { useEffect, useState } from "react";

import { AdminSearch, AdminTable } from "@root/components/custom";
import { formatDate, formatNumber } from "@root/lib";
import { useGetAllTransactions } from "@root/hooks";
import TransactionActions from "./actions";
import Loading from "../loading";

const headContents = ["Customer Name", "Customer Mail", "Amount", "Payment ID", "Date"];

export default function ParentComponent({ token }: { token: string }) {
   const [page, setPage] = useState(1);
   const [value, setValue] = useState("");
   const [deferredValue, setDeferredValue] = useState("");

   useEffect(() => {
      const timeout = setTimeout(() => {
         setDeferredValue(value);
      }, 750);

      return () => clearTimeout(timeout);
   }, [value]);

   const { data: response } = useGetAllTransactions({ pageNumber: page, token, query: deferredValue });
   if (!response) return <Loading />;

   const { numberOfFetchedOrders, orders, totalOrders } = response.data;
   const totalPages = numberOfFetchedOrders && totalOrders ? Math.ceil(totalOrders / numberOfFetchedOrders) : 0;
   const currentPage = numberOfFetchedOrders && totalOrders ? page : 0;

   const orderTableContents = orders.map((order) => {
      let paymentId = order.paymentInfo.id as string;
      /**
       * paymentId
       * trims the characters after first 4 characters and till the last 4 characters
       * customerMail
       * trims the characters after first 6 characters and till the @ part
       * for example: angkushsahu2502@gmail.com becomes -> "angkus.....@gmail.com"
       * */
      paymentId = paymentId.substring(0, 4) + "....." + paymentId.substring(paymentId.length - 4);
      const customerMail =
         order.user.email.substring(0, 6) + "....." + order.user.email.substring(order.user.email.lastIndexOf("@"));

      return {
         customerName: order.user.name,
         customerMail,
         amount: `₹ ${formatNumber(order.totalPrice)}`,
         paymentId,
         date: formatDate({ date: order.createdAt }),
         id: order.id,
      };
   });
   const bodyKeys = orderTableContents[0] ? Object.keys(orderTableContents[0]) : [];

   return (
      <div>
         <h1 className="font-semibold text-3xl">Transactions</h1>
         <AdminSearch setValue={setValue} value={value} placeholder={`Search Transactions ....`} />
         <AdminTable
            bodyElements={orderTableContents}
            headElements={headContents}
            bodyKeys={bodyKeys}
            currentPage={currentPage}
            totalPages={totalPages}
            Actions={TransactionActions}
            setPage={setPage}
            parentPage="Orders"
            token={token}
         />
      </div>
   );
}
