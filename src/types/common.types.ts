export interface ErrorProps {
   error: Error & { digest?: string };
   reset: () => void;
}

export interface ServerPageProps {
   params: {
      slug: string;
   };
   searchParams: {
      [key: string]: string | Array<string> | undefined;
   };
}

export type { CategoryType } from "@root/constants";
export type OrderStatusType = "processing" | "shipped" | "delivered";
export type PaymentStatusType = "paid" | "not-paid";
export type UserRoleType = "user" | "admin" | "super-admin";
export type ProductStockType = "empty" | "non-empty";
