import type { Metadata } from "next";

import UpdateForm from "./updateForm";

export const metadata: Metadata = {
   title: "Update Account - Pacifio",
};

export default function Update() {
   return (
      <main className="min-h-section max-w-xl mx-auto px-5 pt-8 pb-12 flex flex-col justify-center">
         <h1 className="font-semibold text-3xl mb-6">Update Account</h1>
         <UpdateForm />
      </main>
   );
}
