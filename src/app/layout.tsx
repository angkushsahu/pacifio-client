import { Inter } from "next/font/google";
import type { Metadata } from "next";

import { cn } from "@root/lib";

import "@root/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
   title: "Pacifio",
   description: "Pacifio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
            <>{children}</>
         </body>
      </html>
   );
}
