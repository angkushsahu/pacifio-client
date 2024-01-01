import { ProductStockBadge } from "@root/components/custom";
import ProductReviews from "./productReviews/listReviews";
import ProductCarousel from "./productCarousel";
import { formatNumber } from "@root/lib";
import AddToBag from "./addToBag";

const product = {
   title: "KUMARA K552 - TKL WIRED MECHNICAL KEYBAORD RAINBOW (RED SWITCH)",
   inStock: true,
   price: 2550,
   rating: 4,
   maxRating: 5,
   reviews: 2990,
   images: [
      "https://res.cloudinary.com/dvhucdquc/image/upload/v1688629061/pacifio/miscellaneous/banner-keyboard_jpsbah.png",
      "https://res.cloudinary.com/dvhucdquc/image/upload/v1688629061/pacifio/miscellaneous/banner-mouse_erdtbo.png",
      "https://res.cloudinary.com/dvhucdquc/image/upload/v1688629061/pacifio/miscellaneous/banner-mouse-pad_yaiwx7.png",
      "https://res.cloudinary.com/dvhucdquc/image/upload/v1688629061/pacifio/miscellaneous/banner-cooling-pad_dtcpf3.png",
      "https://res.cloudinary.com/dvhucdquc/image/upload/v1703745178/pacifio/miscellaneous/aazsk4web7bidjnhl4hz.png",
   ],
   description: [
      "Tenkeyless compact mechanical gaming keyboard Redragon k552 TKL small compact with dustproof mechanical switches Cherry MX red equivalent Linear switches quiet click sound fast action with minimal resistance without a tactile bump feel.",
      "Rainbow LED RGB backlit mechanical USB gaming keyboard 19 different lighting effects and game modes 2 user-defined modes 6 colors multiple brightness level breathing speed precision-engineered keycaps offering crystal clear uniform backlighting.",
      "Ergonomic designed steel series mechanical game keyboards high-quality durable metal-abs construction with plate-mounted mechanical keys and switches that stand up even during the most testing marathon gaming sessions.",
      "Anti-ghosting all 87 keys are conflict-free key rollover featuring 12 multimedia keyboard keys and a non-slip ergonomic, splash-proof design comes with a gold-plated high-speed corrosion free USB connector for a reliable connection.",
      "Compatible with Windows 10, Windows 8, Windows 7, windows vista, or windows XP, limited mac os keyboard support works well with all major computer brands and gaming pcs.",
   ],
};

export default function Product() {
   return (
      <main className="min-h-section center-layout py-8 px-4">
         <section className="flex flex-col lg:flex-row gap-10">
            {product.images ? (
               <section className="flex-1">
                  <ProductCarousel images={product.images} title={product.title} />
               </section>
            ) : null}
            <section className="flex-1">
               <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
               <ProductStockBadge inStock={product.inStock} />
               <p className="mt-4 font-medium text-xl">₹ {formatNumber(product.price)}</p>
               <p className="mt-1 text-custom-foreground">
                  <span className="font-semibold text-lg mr-2">
                     {product.rating} / {product.maxRating}
                  </span>{" "}
                  <span>
                     {"("}
                     {formatNumber(product.reviews)} rating{product.reviews > 1 ? "s" : ""}
                     {")"}
                  </span>
               </p>
               <AddToBag />
               <div className="mt-8">
                  {product.description.map((para, idx) => (
                     <p key={`${product.title} description-${idx + 1}`} className="my-5 leading-relaxed text-custom-foreground">
                        {para}
                     </p>
                  ))}
               </div>
            </section>
         </section>
         <section className="mt-5">
            <ProductReviews />
         </section>
      </main>
   );
}
