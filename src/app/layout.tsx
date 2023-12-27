import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { cn } from "@root/lib";

import "@root/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const websiteMeta = {
   title: "Pacifio",
   description:
      "A store to meet all the needs of the programmers today. From keyboards to cooling pads, we have jaw-dropping modern tech products for every budget. Check out your desired peripheral, order it if you like the product, and let us know about the product.",
};

export const viewport: Viewport = {
   themeColor: "#ffffff",
   colorScheme: "light",
   width: "device-width",
   initialScale: 1,
};

export const metadata: Metadata = {
   title: websiteMeta.title,
   description: websiteMeta.description,
   robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
   keywords:
      "e-commerce, pacifio, online, shopping, products, cheap, affordable, budget, computer, keyboard, mouse, cooling, pad, cooler, mouse, keyboard, headset, earphone, earpod, headphone",
   creator: "Angkush Sahu",
   publisher: "Angkush Sahu",
   applicationName: websiteMeta.title,
   referrer: "origin-when-cross-origin",
   metadataBase: new URL("https://pacifio.vercel.app"),
   authors: [{ name: "Angkush Sahu", url: "https://angkushsahu.vercel.app" }],
   openGraph: {
      title: websiteMeta.title,
      description: websiteMeta.description,
      images: [{ url: "/og_image.png", width: 192, height: 192 }],
   },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <link rel="manifest" href="/site.webmanifest" />
         <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
            <>{children}</>
         </body>
      </html>
   );
}
