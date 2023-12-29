import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import backgroundImage from "@root/assets/orderSuccessBackground.svg";
import successImage from "@root/assets/successImage.svg";
import { homeUrl } from "@root/constants/routes";
import { Button } from "@root/components/ui";

export const metadata: Metadata = {
   title: "Order placed successfully - Pacifio",
};

export default function OrderSuccess() {
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
