"use client";

import { categories as categoryArray } from "@root/constants";
import { Checkbox, Label } from "@root/components/ui";

export interface CategoryFilterProps {
   categories: Array<string>;
   updateCategories: (value: string) => void;
}

export default function CategoryFilter({ categories, updateCategories }: CategoryFilterProps) {
   return (
      <div>
         <p className="font-medium text-lg">Category</p>
         <ul className="mt-3 space-y-0.5">
            {categoryArray.map((category) => (
               <li key={category.title} className="flex items-center gap-x-4">
                  <Checkbox
                     name={category.title}
                     id={category.title}
                     onCheckedChange={() => updateCategories(category.link)}
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
