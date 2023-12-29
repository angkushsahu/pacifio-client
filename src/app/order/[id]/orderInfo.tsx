import { OrderStatus, PaymentStatus } from "@root/components/elements";

export interface OrderInfoProps {
   address: {
      contact: string;
      location: string;
      city: string;
      state: string;
      country: string;
      pincode: number;
   };
   order: {
      orderedOn: string;
      deliveredOn: string;
      totalItems: number;
      totalPrice: number;
      image: string;
      title: string;
      price: number;
      productId: string;
      stock: number;
      quantity: number;
      totalPricePerItem: number;
      paymentStatus: string;
      deliveryStatus: string;
   };
}

export default function OrderInfo({ address, order }: OrderInfoProps) {
   return (
      <table className="block">
         <tbody className="block border-2 border-custom-marker divide-y-2 divide-custom-marker md:divide-y-0">
            <tr className="flex flex-col md:flex-row md:even:bg-custom">
               <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                  Order Placed on
               </td>
               <td className="w-full p-3 md:pl-4">{order.orderedOn}</td>
            </tr>
            <tr className="flex flex-col md:flex-row md:even:bg-custom">
               <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                  Customer Contact
               </td>
               <td className="w-full p-3 md:pl-4">{address.contact}</td>
            </tr>
            <tr className="flex flex-col md:flex-row md:even:bg-custom">
               <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                  Customer Address
               </td>
               <td className="w-full p-3 md:pl-4">
                  <p>{address.location}</p>
                  <p>
                     {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p>{address.country}</p>
               </td>
            </tr>
            <tr className="flex flex-col md:flex-row md:even:bg-custom">
               <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                  Payment Status
               </td>
               <td className="w-full p-3 md:pl-4">
                  <PaymentStatus status="not-paid" />
               </td>
            </tr>
            <tr className="flex flex-col md:flex-row md:even:bg-custom">
               <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                  Order Status
               </td>
               <td className="w-full p-3 md:pl-4">
                  <OrderStatus status="delivered" />
                  {order.deliveryStatus === "delivered" ? <span className="text-sm"> on {order.deliveredOn}</span> : null}
               </td>
            </tr>
         </tbody>
      </table>
   );
}
