"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Slider, Textarea } from "@root/components/ui";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@root/components/ui";

const reviewFormSchema = z.object({
   description: z.string().min(10, { message: "Review description should be at least 10 characters long" }),
   rating: z.coerce
      .number()
      .gte(1, { message: "Minimum review should at least be 1" })
      .lte(5, { message: "Maximum review is 5" }),
});

export type ReviewFormType = z.infer<typeof reviewFormSchema>;

export default function WriteReview() {
   const reviewForm = useForm<ReviewFormType>({
      resolver: zodResolver(reviewFormSchema),
      defaultValues: { description: "", rating: 1 },
   });

   function onReviewSubmit(values: ReviewFormType) {}

   return (
      <div>
         <Dialog>
            <DialogTrigger asChild>
               <Button>Write a review ?</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle className="text-xl">Feedback</DialogTitle>
               </DialogHeader>
               {/* form -- start */}
               <Form {...reviewForm}>
                  <form onSubmit={reviewForm.handleSubmit(onReviewSubmit)} className="space-y-5">
                     <FormField
                        control={reviewForm.control}
                        name="description"
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
                     <Button type="submit" className="w-full">
                        Save changes
                     </Button>
                  </form>
               </Form>
               {/* form -- end */}
            </DialogContent>
         </Dialog>
      </div>
   );
}
