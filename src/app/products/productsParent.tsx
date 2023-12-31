import { ProductCard } from "@root/components/elements";
import { baseProductUrl } from "@root/constants/routes";
import { Button } from "@root/components/ui";
import EmptyProducts from "./emptyProducts";

export default function ProductsParent() {
   const isProductsEmpty = false;

   if (isProductsEmpty) return <EmptyProducts />;

   return (
      <main className="min-h-section center-layout pt-6 pb-12 px-4">
         <h1 className="mb-6">Here are your results ....</h1>
         <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(22rem,1fr))] gap-12 sm:gap-10">
            {Array.from({ length: 5 }).map((_, idx) => (
               <>
                  <ProductCard
                     productId="something"
                     inStock={true}
                     maxRating={5}
                     price={243000123}
                     rating={4.5}
                     reviews={23498}
                     title="KUMARA K552 - TKL WIRED MECHNICAL KEYBAORD RAINBOW (RED SWITCH)"
                     image="https://res.cloudinary.com/dvhucdquc/image/upload/v1688629061/pacifio/miscellaneous/banner-keyboard_jpsbah.png"
                     link={`${baseProductUrl}/something`}
                     idx={2 * idx + 1}
                  />
                  <ProductCard
                     productId="something"
                     inStock={false}
                     maxRating={5}
                     price={243000123}
                     rating={1.5}
                     reviews={87}
                     title="KUMARA K552 - TKL WIRED MECHNICAL"
                     idx={2 * idx + 2}
                  />
               </>
            ))}
         </div>
         <div className="text-center mt-12">
            <Button variant="outline">Load More ....</Button>
         </div>
      </main>
   );
}
