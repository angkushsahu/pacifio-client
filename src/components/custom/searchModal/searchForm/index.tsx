"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { productsUrl } from "@root/constants/routes";
import SearchFormComponent from "./form";

const MIN_PRICE = 0;
const MAX_PRICE = 100000;
const MIN_RATING = 0;
const MAX_RATING = 5;

const searchSchema = z.object({
   searchTerm: z.string().min(3, { message: "Minimum three characters required to search" }),
   categories: z.array(z.string().min(1, { message: "Enter category" })),
   priceRange: z.tuple([z.coerce.number(), z.coerce.number()]),
   ratingRange: z.tuple([z.coerce.number(), z.coerce.number()]),
});

export type SearchSchemaType = z.infer<typeof searchSchema>;

export interface SearchFormProps {
   setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SearchForm({ setOpen }: SearchFormProps) {
   const searchParams = useSearchParams();

   const initialQuery = searchParams.get("query");
   const initialPriceGte = Number(searchParams.get("price_gte"));
   const initialPriceLte = Number(searchParams.get("price_lte"));
   const initialRatingGte = Number(searchParams.get("rating_gte"));
   const initialRatingLte = Number(searchParams.get("rating_lte"));
   const initialCategories = searchParams.getAll("category");

   const searchForm = useForm<SearchSchemaType>({
      resolver: zodResolver(searchSchema),
      defaultValues: {
         searchTerm: initialQuery ? initialQuery : "",
         categories: initialCategories ? initialCategories : [],
         priceRange: [initialPriceGte ? initialPriceGte : MIN_PRICE, initialPriceLte ? initialPriceLte : MAX_PRICE],
         ratingRange: [initialRatingGte ? initialRatingGte : MIN_RATING, initialRatingLte ? initialRatingLte : MAX_RATING],
      },
   });

   const router = useRouter();

   function onSearch(values: SearchSchemaType) {
      const { categories, priceRange, ratingRange, searchTerm } = values;

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

   function updateCategoriesFilter(value: string) {
      const categories = searchForm.getValues("categories");
      let newCategories: Array<string> = [];

      if (categories.includes(value)) newCategories = categories.filter((category) => category !== value);
      else newCategories = [...categories, value];

      searchForm.setValue("categories", newCategories);
      console.log(searchForm.getValues("categories"));
   }

   function updatePriceFilter(value: [number, number]) {
      searchForm.setValue("priceRange", value);
      console.log(searchForm.getValues("priceRange"));
   }

   function updateRatingFilter(value: [number, number]) {
      searchForm.setValue("ratingRange", value);
      console.log(searchForm.getValues("ratingRange"));
   }

   return (
      <SearchFormComponent
         MAX_PRICE={MAX_PRICE}
         MIN_PRICE={MIN_PRICE}
         MIN_RATING={MIN_RATING}
         MAX_RATING={MAX_RATING}
         onSearch={onSearch}
         searchForm={searchForm}
         updateCategoriesFilter={updateCategoriesFilter}
         updatePriceFilter={updatePriceFilter}
         updateRatingFilter={updateRatingFilter}
      />
   );
}
