import type { Metadata } from "next";

import AddressForm from "../addressForm";

export const metadata: Metadata = {
   title: "Add New Address - Pacifio",
};

export default function CreateAddress() {
   return (
      <main className="min-h-section max-w-xl mx-auto px-5 pt-8 pb-12">
         <h1 className="font-semibold text-3xl mb-6">Add New Address</h1>
         <AddressForm contactNumber="" country="" city="" location="" pincode={0} state="" />
      </main>
   );
}
