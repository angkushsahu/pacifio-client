"use client";

import { useQueryClient } from "@tanstack/react-query";

import { getAllOrdersForAdminQueryKey, getAllOrdersQueryKey, getOrderQueryKey } from "@root/constants";
import type { OrderResponseType } from "@root/validations";
import { useUpdateDeliveryStatus } from "@root/hooks";
import { Button, toast } from "@root/components/ui";
import type { OrderStatusType } from "@root/types";

export interface UpdateOrderStatusProps {
   status: OrderStatusType;
   orderId: string;
   token: string;
}

export default function UpdateOrderStatus({ orderId, status, token }: UpdateOrderStatusProps) {
   const queryClient = useQueryClient();

   function onSuccess(response: OrderResponseType) {
      toast({ title: response.message });
      queryClient.setQueryData([getOrderQueryKey, orderId], () => response);
      queryClient.invalidateQueries({ queryKey: [getAllOrdersQueryKey] });
      queryClient.invalidateQueries({ queryKey: [getAllOrdersForAdminQueryKey] });
   }
   const { mutate: updateStatus, isPending } = useUpdateDeliveryStatus({ onSuccess });

   function onStatusUpdation() {
      if (isPending) return;
      updateStatus({ orderId, token });
   }

   let nextStage: string = "Processing";
   if (status === "processing") nextStage = "Shipped";
   else if (status === "shipped") nextStage = "Delivered";

   return (
      <div className="my-12 text-center">
         <h2 className="text-xl font-medium mb-3 text-neutral-600">
            Current Order Status:{" "}
            <span className="font-semibold text-black">{status[0].toUpperCase() + status.substring(1)}</span>
         </h2>
         <Button disabled={isPending} onClick={onStatusUpdation}>
            Update Order Status to {nextStage}
         </Button>
      </div>
   );
}
