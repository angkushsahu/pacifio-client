import Link from "next/link";

import { createAddressUrl } from "@root/constants/routes";
import AddressOptions from "./addressOptions";
import { Button } from "@root/components/ui";

const address = {
   addressId: "something",
   contactNumber: "8876690053",
   location: "In front of SBI e-corner New Delhi Hawaii Japan",
   city: "Jammu and Kashmir",
   state: "Arunachal Pradesh",
   pincode: 786001,
   country: "India",
};

export default function ShowAllAddress() {
   return (
      <>
         <section className="grid sm:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-8">
            {Array.from({ length: 5 }).map((_, idx) => (
               <article key={`address-${idx}`}>
                  <AddressOptions addressId={`${idx}`} />
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
