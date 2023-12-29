import OrderSummary from "./orderSummary";
import OrderItem from "./orderItem";

export interface OrdersProps {
   orderItem: {
      totalItems: number;
      totalPrice: number;
      image: string;
      title: string;
      price: number;
      productId: string;
      stock: number;
      quantity: number;
      totalPricePerItem: number;
   };
}

export default function Orders({ orderItem }: OrdersProps) {
   return (
      <>
         <OrderSummary totalItems={orderItem.totalItems} totalPrice={orderItem.totalPrice} />
         <section className="border-y-[1px] border-custom-light divide-y-[1px] divide-custom-light">
            {Array.from({ length: 5 }).map((_, idx) => (
               <OrderItem {...orderItem} productIdx={idx + 1} key={`order-item-${idx + 1}`} />
            ))}
         </section>
         <OrderSummary totalItems={orderItem.totalItems} totalPrice={orderItem.totalPrice} />
      </>
   );
}
