import { ProductCard } from "@root/components/custom";
import { baseProductUrl } from "@root/constants/routes";

export default function TopRated() {
   return (
      <section className="center-layout px-5 py-12">
         <h2 className="font-semibold text-2xl mb-5">Top Rated Products</h2>
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
      </section>
   );
}
