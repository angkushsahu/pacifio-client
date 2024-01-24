"use client";

import { useQueryClient } from "@tanstack/react-query";

import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, toast } from "@root/components/ui";
import { getAllReviewsQueryKey, getProductQueryKey, getReviewQueryKey } from "@root/constants";
import type { ReviewResponseType } from "@root/validations";
import ConfirmDeletion from "./confirmDeletion";
import { useGetReview } from "@root/hooks";
import ReviewForm from "./reviewForm";

export interface ChildProps {
   onSuccess: (data: ReviewResponseType) => void;
   slug: string;
   token: string;
}

export type WriteReviewProps = Pick<ChildProps, "slug" | "token">;

export default function WriteReview({ slug, token }: WriteReviewProps) {
   const queryClient = useQueryClient();

   const { data } = useGetReview({ enabled: !!token, productId: slug, token });

   function onSuccess(response: ReviewResponseType) {
      queryClient.invalidateQueries({ queryKey: [getAllReviewsQueryKey, slug] });
      queryClient.invalidateQueries({ queryKey: [getProductQueryKey, slug] });
      queryClient.setQueryData([getReviewQueryKey, slug], () => response);
      toast({ title: response.message });
   }

   return (
      <div>
         <Dialog>
            <DialogTrigger asChild>
               <Button>Write a review ?</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[26.6rem]">
               <DialogHeader>
                  <DialogTitle className="text-xl">Feedback</DialogTitle>
               </DialogHeader>
               <ReviewForm
                  comment={data?.data?.review?.comment || ""}
                  rating={data?.data?.review?.rating || 1}
                  slug={slug}
                  token={token}
                  onSuccess={onSuccess}
               />
               {data?.data?.review ? <ConfirmDeletion slug={slug} token={token} onSuccess={onSuccess} /> : null}
            </DialogContent>
         </Dialog>
      </div>
   );
}
