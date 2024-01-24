import type { Metadata } from "next";

import ContactForm from "./contactForm";

export const metadata: Metadata = {
   title: "Contact - Pacifio",
};

export default function Contact() {
   return (
      <main className="min-h-section max-w-xl mx-auto px-5 pt-8 pb-12">
         <h1 className="font-semibold text-3xl mb-6">Contact Us</h1>
         <ContactForm />
      </main>
   );
}
