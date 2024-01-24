import Link from "next/link";

import type { AddressType } from "@root/validations";
import { createAddressUrl } from "@root/constants";
import AddressOptions from "./addressOptions";
import { Button } from "@root/components/ui";

export interface ShowAllAddressProps {
   addresses: Array<AddressType>;
   token: string;
}

export default function ShowAllAddress({ addresses, token }: ShowAllAddressProps) {
   return (
      <>
         <section className="grid sm:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-8">
            {addresses.map((address) => (
               <article key={`address-${address.id}`}>
                  <AddressOptions addressId={`${address.id}`} token={token} />
                  <div className="bg-custom hover:bg-custom-hover p-5 shadow-md space-y-2">
                     <p>
                        <span className="font-semibold">Contact: </span>
                        <span>{address.contactNumber}</span>
                     </p>
                     <p>{address.location}</p>
                     <p>
                        {address.city}, {address.state} - {address.pincode}
                     </p>
                     <p>{address.country}</p>
                  </div>
               </article>
            ))}
         </section>
         <div className="flex flex-col items-end mt-12">
            <Link href={createAddressUrl} className="w-full sm:w-auto">
               <Button className="w-full">Add New Address</Button>
            </Link>
         </div>
      </>
   );
}
