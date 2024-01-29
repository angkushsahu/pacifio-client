"use client";

import { useEffect, useState } from "react";

import { AdminSearch, AdminTable } from "@root/components/custom";
import { useGetAllOrdersForAdmin } from "@root/hooks";
import { formatDate, formatNumber } from "@root/lib";
import type { OrderStatusType } from "@root/types";
import OrderActions from "./actions";
import Loading from "../loading";

const headContents = ["Order Date", "Total Price", "Order Status", "Customer Name", "Customer Mail"];

export interface ParentComponentProps {
   status: OrderStatusType;
   token: string;
}

export default function ParentComponent({ status, token }: ParentComponentProps) {
   const [page, setPage] = useState(1);
   const [value, setValue] = useState("");
   const [deferredValue, setDeferredValue] = useState("");
   const orderStatus = status[0].toUpperCase() + status.substring(1);

   useEffect(() => {
      const timeout = setTimeout(() => {
         setDeferredValue(value);
      }, 750);

      return () => clearTimeout(timeout);
   }, [value]);

   const { data: response } = useGetAllOrdersForAdmin({ pageNumber: page, token, status, query: deferredValue });
   if (!response) return <Loading />;

   const { numberOfFetchedOrders, orders, totalOrders } = response.data;
   const totalPages = numberOfFetchedOrders && totalOrders ? Math.ceil(totalOrders / numberOfFetchedOrders) : 0;
   const currentPage = numberOfFetchedOrders && totalOrders ? page : 0;

   const orderTableContents = orders.map((order) => ({
      orderDate: formatDate({ date: order.createdAt }),
      totalPrice: `₹ ${formatNumber(order.totalPrice)}`,
      orderStatus: order.deliveryInfo.status[0].toUpperCase() + order.deliveryInfo.status.substring(1),
      customerName: order.user.name,
      customerEmail: order.user.email,
      id: order.id,
   }));
   const bodyKeys = orderTableContents[0] ? Object.keys(orderTableContents[0]) : [];

   return (
      <div>
         <h1 className="font-semibold text-3xl">{orderStatus} Orders</h1>
         <AdminSearch setValue={setValue} value={value} placeholder={`Search ${orderStatus} Orders ....`} />
         <AdminTable
            bodyElements={orderTableContents}
            headElements={headContents}
            bodyKeys={bodyKeys}
            currentPage={currentPage}
            totalPages={totalPages}
            Actions={OrderActions}
            setPage={setPage}
            parentPage="Orders"
            token={token}
         />
      </div>
   );
}
