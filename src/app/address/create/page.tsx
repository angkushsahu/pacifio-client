import { RedirectType, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";

import authOptions from "@root/app/api/auth/authOptions";
import { AddressForm } from "@root/components/custom";
import { loginUrl } from "@root/constants";

export const metadata: Metadata = {
   title: "Add New Address - Pacifio",
};

export default async function CreateAddress() {
   const session = await getServerSession(authOptions);
   if (!session?.user || !session?.token) redirect(loginUrl, RedirectType.replace);

   return (
      <main className="min-h-section max-w-xl mx-auto px-5 pt-8 pb-12">
         <h1 className="font-semibold text-3xl mb-6">Add New Address</h1>
         <AddressForm contactNumber="" country="" city="" location="" pincode="" state="" isCreationRoute token={session.token} />
      </main>
   );
}
