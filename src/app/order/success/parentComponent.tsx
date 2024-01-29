"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import backgroundImage from "@root/assets/orderSuccessBackground.svg";
import { homeUrl, orderFailedUrl } from "@root/constants";
import successImage from "@root/assets/successImage.svg";
import { Button } from "@root/components/ui";
import { useGetOrder } from "@root/hooks";
import Loading from "@root/app/loading";

export interface ParentComponentProps {
   orderId: string;
   token: string;
}

export default function ParentComponent({ orderId, token }: ParentComponentProps) {
   const router = useRouter();

   const { data, isLoading } = useGetOrder({ enabled: true, orderId, token });
   if (isLoading) return <Loading />;
   if (!data) router.replace(orderFailedUrl);

   return (
      <main className="min-h-section center-layout px-5 py-8 flex flex-col items-center justify-center relative">
         <Image src={backgroundImage} alt="Success Image" fill className="-z-10" />
         <Image src={successImage} alt="Success Image" width="250" height="250" />
         <p className="text-center text-lg font-semibold mb-4">Your order has been placed successfully</p>
         <Link href={homeUrl}>
            <Button>Keep Shopping</Button>
         </Link>
      </main>
   );
}
