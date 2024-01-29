import { Search, SlidersHorizontal } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Label } from "@root/components/ui";
import { CategoryFilter, PriceFilter, RatingFilter } from "../../index";
import { DialogFooter } from "@root/components/ui/dialog";
import type { SearchSchemaType } from "@root/validations";

export interface SearchFormComponentProps {
   searchForm: UseFormReturn<SearchSchemaType, any, undefined>;
   updatePriceFilter: (value: [number, number]) => void;
   updateRatingFilter: (value: [number, number]) => void;
   updateCategoriesFilter: (value: string) => void;
   onSearch: (values: SearchSchemaType) => void;
   MIN_PRICE: number;
   MAX_PRICE: number;
   MIN_RATING: number;
   MAX_RATING: number;
}

export default function SearchFormComponent(props: SearchFormComponentProps) {
   const {
      MAX_PRICE,
      MAX_RATING,
      MIN_PRICE,
      MIN_RATING,
      onSearch,
      searchForm,
      updateCategoriesFilter,
      updatePriceFilter,
      updateRatingFilter,
   } = props;

   return (
      <Form {...searchForm}>
         <form onSubmit={searchForm.handleSubmit(onSearch)}>
            <section className="px-6">
               <FormField
                  control={searchForm.control}
                  name="searchTerm"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel htmlFor={field.name}></FormLabel>
                        <FormControl>
                           <Input
                              className="border-neutral-400 rounded-none py-6 text-lg"
                              placeholder="Enter feedback ...."
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div>
                  <Label htmlFor="search"></Label>
               </div>
               <p className="flex items-center gap-x-2 mt-5 mb-3 text-xl font-semibold">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
               </p>
               <div className="flex flex-col sm:flex-row">
                  <FormField
                     control={searchForm.control}
                     name="categories"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel htmlFor={field.name}></FormLabel>
                           <FormControl>
                              <div className="flex-1">
                                 <CategoryFilter categories={field.value} updateCategories={updateCategoriesFilter} />
                              </div>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <div className="flex-1 mt-4 sm:mt-0">
                     <FormField
                        control={searchForm.control}
                        name="priceRange"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel htmlFor={field.name}></FormLabel>
                              <FormControl>
                                 <PriceFilter
                                    MAX_PRICE={MAX_PRICE}
                                    MIN_PRICE={MIN_PRICE}
                                    priceRange={field.value}
                                    updatePriceRange={updatePriceFilter}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={searchForm.control}
                        name="ratingRange"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel htmlFor={field.name}></FormLabel>
                              <div className="mt-4">
                                 <RatingFilter
                                    MAX_RATING={MAX_RATING}
                                    MIN_RATING={MIN_RATING}
                                    ratingRange={field.value}
                                    updateRatingRange={updateRatingFilter}
                                 />
                              </div>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
               </div>
            </section>
            <section className="sticky z-10 inset-0 top-auto bg-white py-3 px-6 shadow-md rotate-180">
               <DialogFooter className="rotate-180">
                  <Button type="submit" className="w-full">
                     <Search className="mr-3 h-4 w-4" /> Search
                  </Button>
               </DialogFooter>
            </section>
         </form>
      </Form>
   );
}
