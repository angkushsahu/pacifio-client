"use client";

import { useState } from "react";
import Link from "next/link";

import { confirmOrderUrl, createAddressUrl } from "@root/constants/routes";
import AddressOptions from "./addressOptions";
import { Button } from "@root/components/ui";
import { cn } from "@root/lib";

const address = {
   addressId: "something",
   contactNumber: "8876690053",
   location: "In front of SBI e-corner New Delhi Hawaii Japan",
   district: "Jammu and Kashmir",
   state: "Arunachal Pradesh",
   pincode: 786001,
   country: "India",
};

export default function ShowAllAddress() {
   const [chosenAddress, setChosenAddress] = useState("");

   return (
      <>
         <section className="grid sm:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-8">
            {Array.from({ length: 5 }).map((_, idx) => (
               <article key={`address-${idx}`}>
                  <AddressOptions addressId={`${idx}`} />
                  <div
                     className={cn("cursor-pointer bg-custom hover:bg-custom-hover p-5 shadow-md space-y-2", {
                        "border-2 border-black": chosenAddress === `${address.addressId}-${idx + 1}`,
                     })}
                     onClick={() => setChosenAddress(`${address.addressId}-${idx + 1}`)}
                  >
                     <p>
                        <span className="font-semibold">Contact: </span>
                        <span>{address.contactNumber}</span>
                     </p>
                     <p>{address.location}</p>
                     <p>
                        {address.district}, {address.state} - {address.pincode}
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
            <Link href={createAddressUrl} className="w-full sm:w-48">
               <Button variant="outline" className="border-2 border-custom-foreground w-full">
                  Add New Address
               </Button>
            </Link>
         </div>
      </>
   );
}
