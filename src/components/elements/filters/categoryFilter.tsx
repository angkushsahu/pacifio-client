"use client";

import type { Dispatch, SetStateAction } from "react";

import { categories as categoryArray } from "@root/constants/categories";
import { Checkbox, Label } from "@root/components/ui";

export interface CategoryFilterProps {
   categories: Array<string>;
   setCategories: Dispatch<SetStateAction<Array<string>>>;
}

export default function CategoryFilter({ categories, setCategories }: CategoryFilterProps) {
   function updateCategoryLink(link: string) {
      if (categories.includes(link)) {
         const newCategories = categories.filter((category) => category !== link);
         setCategories(newCategories);
      } else setCategories((prev) => [...prev, link]);
   }

   return (
      <div>
         <p className="font-medium text-lg">Category</p>
         <ul className="mt-3 space-y-0.5">
            {categoryArray.map((category) => (
               <li key={category.title} className="flex items-center gap-x-4">
                  <Checkbox
                     name={category.title}
                     id={category.title}
                     onCheckedChange={() => updateCategoryLink(category.link)}
                     checked={categories.includes(category.link)}
                  />
                  <Label htmlFor={category.title} className="text-base cursor-pointer">
                     {category.title}
                  </Label>
               </li>
            ))}
         </ul>
      </div>
   );
}
