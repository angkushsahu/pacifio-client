import type { PropsWithChildren } from "react";

export default function TD({ children }: PropsWithChildren) {
   return <td className="even:bg-custom-hover lg:even:bg-transparent px-2 py-3">{children}</td>;
}
