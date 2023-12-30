import { redirect } from "next/navigation";

import { createAddressUrl } from "@root/constants/routes";
import ShowAllAddress from "./showAllAddress";

export default function AddressParent() {
   const isAddressEmpty = !false;

   if (isAddressEmpty) redirect(createAddressUrl);

   return (
      <main className="min-h-section center-layout px-5 pt-8 pb-12">
         <h1 className="font-semibold text-3xl mb-6">Choose an address</h1>
         <ShowAllAddress />
      </main>
   );
}
