"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import { confirmOrderUrl, createAddressUrl } from "@root/constants";
import { AddressOptions } from "@root/components/custom";
import type { AddressType } from "@root/validations";
import { Button } from "@root/components/ui";
import { cn } from "@root/lib";

export interface ShowAllAddressProps {
   addresses: Array<AddressType>;
   token: string;
}

export default function ShowAllAddress({ addresses, token }: ShowAllAddressProps) {
   const shipping_id = useSearchParams().get("shipping_id");
   const [chosenAddress, setChosenAddress] = useState(shipping_id ? shipping_id : "");

   return (
      <>
         <section className="grid sm:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-8">
            {addresses.map((address) => (
               <article key={`address-${address.id}`}>
                  <AddressOptions addressId={address.id} token={token} shippingRoute />
                  <div
                     className={cn("cursor-pointer bg-custom hover:bg-custom-hover p-5 shadow-md space-y-2", {
                        "border-2 border-black": chosenAddress === address.id,
                     })}
                     onClick={() => setChosenAddress(address.id)}
                  >
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
         <div className="flex flex-col items-end gap-y-4 mt-12">
            {chosenAddress ? (
               <Link href={`${confirmOrderUrl}?shipping_id=${chosenAddress}`} className="w-full sm:w-48">
                  <Button className="w-full">Use selected Address</Button>
               </Link>
            ) : null}
            <Link href={`${createAddressUrl}?shipping=true`} className="w-full sm:w-48">
               <Button variant="outline" className="border-2 border-custom-foreground w-full">
                  Add New Address
               </Button>
            </Link>
         </div>
      </>
   );
}
