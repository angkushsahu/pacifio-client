import { Button } from "@root/components/ui";
import WriteReview from "./writeReview";
import Review from "./review";

const review = {
   userName: "John Doe",
   rating: 5,
   maxRating: 5,
   description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit minima, amet commodi officia autem rem, earum eligendi maiores labore vero ipsa necessitatibus nostrum assumenda eveniet ipsum? Corrupti natus sunt error.",
};

export default function ProductReviews() {
   return (
      <div>
         <h2 className="text-xl font-semibold mb-2">Product Reviews</h2>
         <WriteReview />
         <div className="grid md:grid-cols-2 gap-5 md:gap-8 mt-8">
            {Array.from({ length: 3 }).map((_, idx) => (
               <>
                  <Review key={`review-${idx * 2 + 1}`} {...review} />
                  <Review key={`review-${idx * 2 + 2}`} {...review} description={review.description + review.description} />
               </>
            ))}
         </div>
         <div className="text-center mt-12">
            <Button variant="outline">Load More ....</Button>
         </div>
      </div>
   );
}
