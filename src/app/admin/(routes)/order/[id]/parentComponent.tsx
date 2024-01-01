import { OrderStatus, Orders, PaymentStatus } from "@root/components/custom";
import UpdateOrderStatus from "./updateOrderStatus";

const orderSummary = {
   orderId: "something",
   address: {
      contact: "8876690064",
      location: "In front of SBI e-corner New Delhi Hawaii Japan",
      city: "Jammu and Kashmir",
      state: "Arunachal Pradesh",
      pincode: 785001,
      country: "India",
   },
   order: {
      orderedOn: "26th July, 2023",
      deliveredOn: "29th September, 2023",
      totalItems: 5,
      totalPrice: 2300,
      image: "https://res.cloudinary.com/dvhucdquc/image/upload/v1688629061/pacifio/miscellaneous/banner-keyboard_jpsbah.png",
      title: "KUMARA K552 - TKL WIRED MECHNICAL KEYBAORD RAINBOW (RED SWITCH)",
      price: 2550,
      productId: "something",
      stock: 5,
      quantity: 3,
      totalPricePerItem: 6900,
      paymentStatus: "not-paid",
      deliveryStatus: "delivered",
   },
   user: {
      name: "Angkush Sahu",
      email: "angkushsahu2502@gmail.com",
   },
};

export default function ParentComponent() {
   return (
      <div>
         <h1 className="font-semibold text-3xl mb-4">Order Stats</h1>
         <table className="block">
            <tbody className="block border-2 border-custom-marker divide-y-2 divide-custom-marker md:divide-y-0">
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     Order Id
                  </td>
                  <td className="w-full p-3 md:pl-4 break-all">{orderSummary.orderId}</td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     Order Placed on
                  </td>
                  <td className="w-full p-3 md:pl-4">{orderSummary.order.orderedOn}</td>
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
                     {orderSummary.order.deliveryStatus === "delivered" ? (
                        <span className="text-sm"> on {orderSummary.order.deliveredOn}</span>
                     ) : null}
                  </td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     User Name
                  </td>
                  <td className="w-full p-3 md:pl-4">{orderSummary.user.name}</td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     User E-mail
                  </td>
                  <td className="w-full p-3 md:pl-4 break-all">{orderSummary.user.email}</td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     Customer Contact
                  </td>
                  <td className="w-full p-3 md:pl-4">{orderSummary.address.contact}</td>
               </tr>
               <tr className="flex flex-col md:flex-row md:even:bg-custom">
                  <td className="md:w-56 lg:w-96 p-3 bg-custom md:bg-transparent md:border-r-2 border-custom-marker font-semibold">
                     Customer Address
                  </td>
                  <td className="w-full p-3 md:pl-4">
                     <p>{orderSummary.address.location}</p>
                     <p>
                        {orderSummary.address.city}, {orderSummary.address.state} - {orderSummary.address.pincode}
                     </p>
                     <p>{orderSummary.address.country}</p>
                  </td>
               </tr>
            </tbody>
         </table>
         <UpdateOrderStatus status="processing" />
         <div className="mt-8">
            <h1 className="font-semibold text-2xl text-custom-foreground mb-6">Ordered Products</h1>
            <Orders orderItem={orderSummary.order} />
         </div>
      </div>
   );
}
