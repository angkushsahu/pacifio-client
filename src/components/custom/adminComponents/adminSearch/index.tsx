import type { Dispatch, SetStateAction } from "react";

import { Input } from "@root/components/ui";

export interface AdminSearchProps {
   value: string;
   setValue: Dispatch<SetStateAction<string>>;
   placeholder?: string;
}

export default function AdminSearch({ setValue, value, placeholder }: AdminSearchProps) {
   return (
      <div className="my-5">
         <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder || "Search ...."} />
      </div>
   );
}
