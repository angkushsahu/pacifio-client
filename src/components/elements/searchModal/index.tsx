"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { type KeyboardEvent, useState } from "react";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@root/components/ui/dialog";
import { CategoryFilter, PriceFilter, RatingFilter } from "..";
import { Button, Input, Label } from "@root/components/ui";
import { productsUrl } from "@root/constants/routes";

const MIN_PRICE = 0;
const MAX_PRICE = 100000;
const MIN_RATING = 0;
const MAX_RATING = 5;

export default function SearchModal() {
   const searchParams = useSearchParams();

   const initialQuery = searchParams.get("query");
   const initialPriceGte = Number(searchParams.get("price_gte"));
   const initialPriceLte = Number(searchParams.get("price_lte"));
   const initialRatingGte = Number(searchParams.get("rating_gte"));
   const initialRatingLte = Number(searchParams.get("rating_lte"));
   const initialCategories = searchParams.getAll("category");

   const [open, setOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState(initialQuery ? initialQuery : "");
   const [categories, setCategories] = useState<Array<string>>(initialCategories ? initialCategories : []);
   const [priceRange, setPriceRange] = useState<[number, number]>([
      initialPriceGte ? initialPriceGte : MIN_PRICE,
      initialPriceLte ? initialPriceLte : MAX_PRICE,
   ]);
   const [ratingRange, setRatingRange] = useState<[number, number]>([
      initialRatingGte ? initialRatingGte : MIN_RATING,
      initialRatingLte ? initialRatingLte : MAX_RATING,
   ]);

   const router = useRouter();

   function onSearch() {
      if (!searchTerm) return;

      let params = new URLSearchParams();
      if (categories.length) {
         categories.map((category) => params.append("category", category));
      }
      params.set("price_gte", `${priceRange[0]}`);
      params.set("price_lte", `${priceRange[1]}`);
      params.set("rating_gte", `${ratingRange[0]}`);
      params.set("rating_lte", `${ratingRange[1]}`);
      params.set("query", searchTerm);

      let url = productsUrl;
      if (params.size) url += "?" + params;

      router.push(url, { scroll: false });
      setOpen(false);
   }

   function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
      if (e.key === "Enter") onSearch();
   }

   return (
      <Dialog defaultOpen={false} open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button
               variant="outline"
               size="icon"
               className="rounded-full -order-1 md:order-none border-none bg-custom hover:bg-custom-hover"
            >
               <Search className="w-4 h-4 sm:w-6 sm:h-6" />
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[31.25rem] w-11/12 max-h-[80vh] overflow-y-auto p-0 pt-6">
            <DialogHeader className="px-6">
               <DialogTitle className="text-2xl">Search Menu</DialogTitle>
            </DialogHeader>
            <section className="px-6">
               <div>
                  <Label htmlFor="search"></Label>
                  <Input
                     id="search"
                     className="border-neutral-400 rounded-none py-6 text-lg"
                     placeholder="Search Pacifio ...."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     onKeyDown={onKeyDown}
                  />
               </div>
               <p className="flex items-center gap-x-2 mt-5 mb-3 text-xl font-semibold">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
               </p>
               <div className="flex flex-col sm:flex-row">
                  <div className="flex-1">
                     <CategoryFilter categories={categories} setCategories={setCategories} />
                  </div>
                  <div className="flex-1 mt-4 sm:mt-0">
                     <PriceFilter
                        MAX_PRICE={MAX_PRICE}
                        MIN_PRICE={MIN_PRICE}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                     />
                     <div className="mt-4">
                        <RatingFilter
                           MAX_RATING={MAX_RATING}
                           MIN_RATING={MIN_RATING}
                           ratingRange={ratingRange}
                           setRatingRange={setRatingRange}
                        />
                     </div>
                  </div>
               </div>
            </section>
            <section className="sticky z-10 inset-0 top-auto bg-white py-3 px-6 shadow-md rotate-180">
               <DialogFooter className="rotate-180">
                  <Button type="submit" className="w-full" onClick={onSearch}>
                     <Search className="mr-3 h-4 w-4" /> Search
                  </Button>
               </DialogFooter>
            </section>
         </DialogContent>
      </Dialog>
   );
}
