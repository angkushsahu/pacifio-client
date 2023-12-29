import { CheckCheck, X } from "lucide-react";

import { PaymentStatusType } from "@root/types";
import { Badge } from "@root/components/ui";
import { cn } from "@root/lib";

export interface PaymentStatusProps {
   status: PaymentStatusType;
}

export default function PaymentStatus({ status }: PaymentStatusProps) {
   return (
      <Badge
         className={cn({
            "bg-green-600 hover:bg-green-600": status === "paid",
            "bg-destructive hover:bg-destructive": status === "not-paid",
         })}
      >
         {status === "paid" ? <CheckCheck className="mr-1 w-4 h-4" /> : <X className="mr-1 w-4 h-4" />}{" "}
         {status === "paid" ? "Paid" : "Not Paid"}
      </Badge>
   );
}
