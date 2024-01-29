import type { ShoppingBagItemType } from "@root/validations";
import OrderSummary from "./orderSummary";
import OrderItem from "./orderItem";

export interface OrdersProps {
   order: Array<ShoppingBagItemType>;
   totalPrice: number;
   totalItems: number;
}

export default function Orders({ order, totalItems, totalPrice }: OrdersProps) {
   return (
      <>
         <OrderSummary totalItems={totalItems} totalPrice={totalPrice} />
         <section className="border-y-[1px] border-custom-light divide-y-[1px] divide-custom-light">
            {order.map((orderItem, idx) => (
               <OrderItem {...orderItem} productIdx={idx + 1} key={`order-item-${idx + 1}`} />
            ))}
         </section>
         <OrderSummary totalItems={totalItems} totalPrice={totalPrice} />
      </>
   );
}
