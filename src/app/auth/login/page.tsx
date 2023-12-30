import type { Metadata } from "next";

import LoginForm from "./loginForm";

export const metadata: Metadata = {
   title: "Login - Pacifio",
};

export default function Login() {
   return (
      <main className="min-h-section max-w-xl mx-auto px-5 pt-8 pb-12 flex flex-col justify-center">
         <h1 className="font-semibold text-3xl mb-6">Login</h1>
         <LoginForm />
      </main>
   );
}
