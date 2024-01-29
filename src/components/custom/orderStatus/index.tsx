import type { OrderStatusType } from "@root/types";
import { Badge } from "@root/components/ui";
import { cn } from "@root/lib";

export interface OrderStatusProps {
   status: OrderStatusType;
}

export default function OrderStatus({ status }: OrderStatusProps) {
   return (
      <Badge
         className={cn("capitalize", {
            "bg-green-600 hover:bg-green-600": status === "delivered",
            "bg-orange-500 hover:bg-orange-500": status === "shipped",
            "bg-destructive hover:bg-destructive": status === "processing",
         })}
      >
         {status}
      </Badge>
   );
}
