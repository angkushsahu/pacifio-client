"use client";

import { useGetHighestRatedProducts } from "@root/hooks";
import { ProductCard } from "@root/components/custom";
import { baseProductUrl } from "@root/constants";
import LoadingTopRated from "./loadingTopRated";

export default function TopRated() {
   const { data: response } = useGetHighestRatedProducts();
   if (!response?.data) return <LoadingTopRated />;
   const { products } = response.data;

   return (
      <section className="center-layout px-5 py-12">
         <h2 className="font-semibold text-2xl mb-5">Top Rated Products</h2>
         <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(22rem,1fr))] gap-12 sm:gap-10">
            {products.map((product, idx) => (
               <ProductCard
                  key={product.id}
                  productId={product.id}
                  inStock={product.stock > 0}
                  maxRating={5}
                  price={product.price}
                  rating={product.rating.averageRating}
                  reviews={product.rating.numberOfReviews}
                  title={product.name}
                  // image={product.defaultImage.secureUrl}
                  image="https://res.cloudinary.com/dvhucdquc/image/upload/v1688629061/pacifio/miscellaneous/banner-keyboard_jpsbah.png"
                  link={`${baseProductUrl}/${product.id}`}
                  idx={idx + 1}
               />
            ))}
         </div>
      </section>
   );
}
