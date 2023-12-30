import type { Metadata } from "next";

import ForgotPasswordForm from "./forgotPasswordForm";

export const metadata: Metadata = {
   title: "Forgot Password - Pacifio",
};

export default function ForgotPassword() {
   return (
      <main className="min-h-section max-w-xl mx-auto px-5 pt-8 pb-12 flex flex-col justify-center">
         <h1 className="font-semibold text-3xl mb-6">Forgot Password</h1>
         <ForgotPasswordForm />
      </main>
   );
}
