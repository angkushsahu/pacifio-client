export interface ServerPageProps {
   params: {
      slug: string;
   };
   searchParams: {
      [key: string]: string | Array<string> | undefined;
   };
}

export type OrderStatusType = "processing" | "shipped" | "delivered";
export type PaymentStatusType = "paid" | "not-paid";
