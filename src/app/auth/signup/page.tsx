import type { Metadata } from "next";

import SignupForm from "./signupForm";

export const metadata: Metadata = {
   title: "Signup - Pacifio",
};

export default function Signup() {
   return (
      <main className="min-h-section max-w-xl mx-auto px-5 pt-8 pb-12 flex flex-col justify-center">
         <h1 className="font-semibold text-3xl mb-6">Signup</h1>
         <SignupForm />
      </main>
   );
}
