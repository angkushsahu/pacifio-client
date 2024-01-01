import { SelectLabel, SelectTrigger, SelectValue, Separator } from "@root/components/ui";
import { Select, SelectContent, SelectGroup, SelectItem } from "@root/components/ui";
import { type CategoryType, categories } from "@root/constants/categories";

export interface SelectCategoryProps {
   setCategory: (value: CategoryType) => void;
}

export default function SelectCategory({ setCategory }: SelectCategoryProps) {
   return (
      <Select onValueChange={(e) => setCategory(e as CategoryType)}>
         <SelectTrigger className="border-custom-light">
            <SelectValue placeholder="Select Product Category" />
         </SelectTrigger>
         <SelectContent className="rounded-none">
            <SelectGroup>
               <SelectLabel>Categories</SelectLabel>
               <Separator />
               {categories.map(({ link, title }) => (
                  <SelectItem key={title} value={link}>
                     {title}
                  </SelectItem>
               ))}
            </SelectGroup>
         </SelectContent>
      </Select>
   );
}
