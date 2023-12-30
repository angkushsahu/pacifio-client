import type { Metadata } from "next";

import ChangePasswordForm from "./changePasswordForm";

export const metadata: Metadata = {
   title: "Change Password - Pacifio",
};

export default function ChangePassword() {
   return (
      <main className="min-h-section max-w-xl mx-auto px-5 pt-8 pb-12 flex flex-col justify-center">
         <h1 className="font-semibold text-3xl mb-6">Change Password</h1>
         <ChangePasswordForm />
      </main>
   );
}
