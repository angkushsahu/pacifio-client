"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import type { AllProductsResponseType } from "@root/validations";
import { ProductCard } from "@root/components/custom";
import { baseProductUrl } from "@root/constants";
import { useGetAllProducts } from "@root/hooks";
import { Button } from "@root/components/ui";
import EmptyProducts from "./emptyProducts";
import LoadingProducts from "./loading";

export default function ParentComponent() {
   const searchParams = useSearchParams();

   const { data, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = useGetAllProducts({
      searchParams: searchParams.toString(),
   });
   useEffect(() => void refetch(), [searchParams]);
   if (!data) return <LoadingProducts />;
   if (!data.pages.length || !data.pages[0] || !(data.pages[0] as AllProductsResponseType).data.products.length)
      return <EmptyProducts />;

   return (
      <main className="min-h-section center-layout pt-6 pb-12 px-4">
         <h1 className="mb-6">Here are your results ....</h1>
         <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-12 sm:gap-10">
            {data.pages
               .flatMap((page) => (page as AllProductsResponseType).data.products)
               .flatMap((product) => product)
               .map((product, idx) => (
                  <ProductCard
                     key={product.id}
                     productId={product.id}
                     inStock={product.stock > 0}
                     maxRating={5}
                     price={product.price}
                     rating={product.rating.averageRating}
                     reviews={product.rating.numberOfReviews}
                     title={product.name}
                     image={product.defaultImage.secureUrl}
                     link={`${baseProductUrl}/${product.id}`}
                     idx={idx + 1}
                  />
               ))}
         </div>
         <div className="text-center mt-12">
            {hasNextPage ? (
               <Button variant="outline" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                  Load More ....
               </Button>
            ) : (
               <p>No more results</p>
            )}
         </div>
      </main>
   );
}
