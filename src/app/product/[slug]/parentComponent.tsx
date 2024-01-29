"use client";

import { ProductStockBadge } from "@root/components/custom";
import ProductReviews from "./productReviews/listReviews";
import ProductCarousel from "./productCarousel";
import { useGetProduct } from "@root/hooks";
import { formatNumber } from "@root/lib";
import AddToBag from "./addToBag";
import Loading from "./loading";

export default function ParentComponent({ slug, token }: { slug: string; token: string | null | undefined }) {
   const { data: response } = useGetProduct({ enabled: true, id: slug });
   if (!response) return <Loading />;
   const { product } = response.data;

   return (
      <main className="min-h-section center-layout py-8 px-4">
         <section className="flex flex-col lg:flex-row gap-10">
            {product.images?.length ? (
               <section className="flex-1">
                  <ProductCarousel images={product.images} title={product.name} />
               </section>
            ) : null}
            <section className="flex-1">
               <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
               <ProductStockBadge inStock={product.stock > 0} />
               <p className="mt-4 font-medium text-xl">₹ {formatNumber(product.price)}</p>
               <p className="mt-1 text-custom-foreground">
                  <span className="font-semibold text-lg mr-2">
                     {product.rating.averageRating} / {5}
                  </span>{" "}
                  <span>
                     {"("}
                     {formatNumber(product.rating.numberOfReviews)} rating{product.rating.numberOfReviews > 1 ? "s" : ""}
                     {")"}
                  </span>
               </p>
               {token && product.stock > 0 ? <AddToBag totalStock={product.stock} token={token} productId={slug} /> : null}
               <div className="mt-8">
                  {product.description.split("\n").map((para, idx) => (
                     <p key={`${product.name} description-${idx + 1}`} className="my-5 leading-relaxed text-custom-foreground">
                        {para}
                     </p>
                  ))}
               </div>
            </section>
         </section>
         <section className="mt-5">
            <ProductReviews slug={slug} token={token} />
         </section>
      </main>
   );
}
