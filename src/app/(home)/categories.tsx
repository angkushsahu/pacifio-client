import Link from "next/link";

import { categories } from "@root/constants/categories";

export default function Categories() {
   return (
      <section className="center-layout px-5 py-12">
         <h2 className="font-semibold text-2xl mb-5">Shop by Category</h2>
         <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(18.25rem,1fr))] gap-5">
            {categories.map((category) => (
               <Link href={`/products?category=${category.link}`} key={category.title}>
                  <article className="bg-custom hover:bg-custom-hover px-5 py-8 rounded-md shadow-md flex flex-col items-center justify-center">
                     <category.Icon width="30" height="30" className="text-custom-foreground" />
                     <p className="font-semibold font-lg mt-4">{category.title}</p>
                  </article>
               </Link>
            ))}
         </div>
      </section>
   );
}
