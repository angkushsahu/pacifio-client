"use client";

import type { AllReviewResponseType } from "@root/validations";
import { useGetAllReviews } from "@root/hooks";
import { Button } from "@root/components/ui";
import WriteReview from "./writeReview";
import Review from "./review";

export interface ProductReviewsProps {
   slug: string;
   token: string | null | undefined;
}

export default function ProductReviews({ slug, token }: ProductReviewsProps) {
   const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetAllReviews({ productId: slug });

   return (
      <div>
         <h2 className="text-xl font-semibold mb-2">Product Reviews</h2>
         {token ? <WriteReview slug={slug} token={token} /> : null}
         {(data?.pages[0] as AllReviewResponseType)?.data?.reviews?.length ? (
            <>
               <div className="grid md:grid-cols-2 gap-5 md:gap-8 mt-8">
                  {data?.pages
                     .flatMap((page) => (page as AllReviewResponseType).data.reviews)
                     .flatMap((review) => review)
                     .map((review) => (
                        <Review
                           key={review.id}
                           comment={review.comment}
                           maxRating={5}
                           rating={review.rating}
                           userName={review.user.name}
                        />
                     ))}
               </div>
               {hasNextPage &&
               (data?.pages[data.pages.length - 1] as AllReviewResponseType).data.numberOfFetchedReviews <
                  (data?.pages[data.pages.length - 1] as AllReviewResponseType).data.totalReviews ? (
                  <div className="text-center mt-12">
                     <Button variant="outline" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                        Load More ....
                     </Button>
                  </div>
               ) : null}
            </>
         ) : (
            <div className="mt-4">
               <h3>No reviews yet ....</h3>
            </div>
         )}
      </div>
   );
}
