import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "About - Pacifio",
};

export default function About() {
   return (
      <main className="min-h-section max-w-xl mx-auto px-5 py-8">
         <h1 className="font-semibold text-3xl">About Pacifio</h1>
         <p className="text-custom-foreground leading-relaxed my-6">
            Welcome to Pacifio, where we specialize in providing you with the best coding and gaming accessories on the market. We
            understand the importance of having the right equipment to enhance your gaming experience and that's why we offer a
            wide range of products to suit your needs. From controllers and headsets to gaming mice and keyboards, we've got it
            all.
         </p>
         <p className="text-custom-foreground leading-relaxed my-6">
            Our mission is to provide our customers with high-quality products at an affordable price. We understand that gaming
            can be an expensive hobby and we want to make sure that you have access to the best gear without breaking the bank. We
            also strive to provide our customers with exceptional customer service, ensuring that every customer has a positive
            shopping experience.
         </p>
         <p className="text-custom-foreground leading-relaxed my-6">
            Our inventory is constantly updating with new and exciting products, so you can always find something that meets your
            gaming needs. Whether you're a hardcore gamer or just starting out, we've got something for everyone. We also offer a
            variety of payment options, so you can choose the one that best suits your needs.
         </p>
         <p className="text-custom-foreground leading-relaxed my-6">
            Thank you for choosing Pacifio, we are passionate about gaming and we look forward to serving you. We're confident
            that you'll find everything you need to take your gaming to the next level. If you have any questions or concerns,
            please don't hesitate to reach out to us. We're here to help you in any way we can. Happy shopping!
         </p>
      </main>
   );
}
