import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@root/components/ui";
import { type ReviewFormType, reviewFormSchema } from "@root/validations";
import { Button, Slider, Textarea } from "@root/components/ui";
import type { ChildProps } from "./writeReview";
import { useAddReview } from "@root/hooks";

export interface ReviewFormProps extends ChildProps {
   comment: string;
   rating: number;
}

export default function ReviewForm({ comment, onSuccess, rating, slug, token }: ReviewFormProps) {
   const reviewForm = useForm<ReviewFormType>({
      resolver: zodResolver(reviewFormSchema),
      defaultValues: { comment, rating },
   });

   const { mutate: addReviewMutation, isPending } = useAddReview({ onSuccess });

   function onReviewSubmit(values: ReviewFormType) {
      if (isPending) return;
      addReviewMutation({ token, values: { ...values, productId: slug } });
   }

   return (
      <Form {...reviewForm}>
         <form onSubmit={reviewForm.handleSubmit(onReviewSubmit)} className="space-y-5">
            <FormField
               control={reviewForm.control}
               name="comment"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Write your review</FormLabel>
                     <FormControl>
                        <Textarea
                           className="rounded-none resize-none border-neutral-500"
                           cols={10}
                           placeholder="Enter feedback ...."
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={reviewForm.control}
               name="rating"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Enter a rating</FormLabel>
                     <FormControl>
                        <Slider
                           defaultValue={[field.value]}
                           max={5}
                           min={0}
                           step={1}
                           value={[field.value]}
                           onValueChange={(e) => reviewForm.setValue("rating", e[0])}
                        />
                     </FormControl>
                     <FormDescription>
                        <span className="text-lg text-black">{reviewForm.watch("rating")}</span> out of 5
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
               Save changes
            </Button>
         </form>
      </Form>
   );
}
