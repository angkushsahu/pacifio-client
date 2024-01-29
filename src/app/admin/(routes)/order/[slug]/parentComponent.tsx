"use client";

import { OrderStatus, Orders, PaymentStatus } from "@root/components/custom";
import type { ShoppingBagItemType } from "@root/validations";
import UpdateOrderStatus from "./updateOrderStatus";
import { useGetOrderForAdmin } from "@root/hooks";
import Loading from "../../loading";

export default function ParentComponent({ orderId, token }: { orderId: string; token: string }) {
   const { data: response } = useGetOrderForAdmin({ enabled: true, orderId: orderId, token });
   if (!response) return <Loading />;
   const { order } = response.data;

   const orderItems: Array<ShoppingBagItemType> = order.products.map((item) => ({
      itemPrice: item.itemPrice,
      quantity: item.quantity,
      product: {
         _id: item.productId,
         defaultImage: { publicUrl: "", secureUrl: item.image },
         name: item.name,
         price: item.price,
         stock: 0,
      },
   }));

   return (
      <div>
         <h1 className="font-semibold text-3xl mb-4">Order Stats</h1>
         <table className="block">
            <tbody className="block border-2 border-custom-marker divide-y-2 divide-custom-marker md:divide-y-0">
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     Order Id
                  </td>
                  <td className="w-full p-3 md:pl-4 break-all">{order.id}</td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     Order Placed on
                  </td>
                  <td className="w-full p-3 md:pl-4">{order.createdAt}</td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     Payment Status
                  </td>
                  <td className="w-full p-3 md:pl-4">
                     <PaymentStatus status={order.paymentInfo.status} />
                  </td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     Payment ID
                  </td>
                  <td className="w-full p-3 md:pl-4 break-all">{order.paymentInfo.id}</td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     Order Status
                  </td>
                  <td className="w-full p-3 md:pl-4">
                     <OrderStatus status={order.deliveryInfo.status} />
                     {order.deliveryInfo.status === "delivered" ? (
                        <span className="text-sm"> on {order.deliveryInfo.time}</span>
                     ) : null}
                  </td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     User Name
                  </td>
                  <td className="w-full p-3 md:pl-4">{order.user.name}</td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     User E-mail
                  </td>
                  <td className="w-full p-3 md:pl-4 break-all">{order.user.email}</td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     Customer Contact
                  </td>
                  <td className="w-full p-3 md:pl-4">{order.address.contactNumber}</td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     Customer Address
                  </td>
                  <td className="w-full p-3 md:pl-4">
                     <p>{order.address.location}</p>
                     <p>
                        {order.address.city}, {order.address.state} - {order.address.pincode}
                     </p>
                     <p>{order.address.country}</p>
                  </td>
               </tr>
            </tbody>
         </table>
         {order.deliveryInfo.status !== "delivered" ? (
            <UpdateOrderStatus status={order.deliveryInfo.status} orderId={orderId} token={token} />
         ) : null}
         <div className="mt-8">
            <h1 className="font-semibold text-2xl text-custom-foreground mb-6">Ordered Products</h1>
            <Orders order={orderItems} totalItems={order.products.length} totalPrice={order.totalPrice} />
         </div>
      </div>
   );
}
