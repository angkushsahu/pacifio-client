import type { Metadata } from "next";

import ResetPasswordForm from "./resetPasswordForm";

export const metadata: Metadata = {
   title: "Reset Password - Pacifio",
};

export default function ResetPassword() {
   return (
      <main className="min-h-section max-w-xl mx-auto px-5 pt-8 pb-12 flex flex-col justify-center">
         <h1 className="font-semibold text-3xl mb-6">Reset Password</h1>
         <ResetPasswordForm />
      </main>
   );
}
