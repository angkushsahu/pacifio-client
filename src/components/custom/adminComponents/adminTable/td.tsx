import type { HTMLProps, PropsWithChildren } from "react";

export default function TD({ children, ...attributes }: PropsWithChildren & HTMLProps<HTMLTableCellElement>) {
   return (
      <td {...attributes} className="even:bg-custom-hover lg:even:bg-transparent px-2 py-3">
         {children}
      </td>
   );
}
