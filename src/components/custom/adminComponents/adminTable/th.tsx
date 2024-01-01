import type { PropsWithChildren } from "react";

export default function TH({ children }: PropsWithChildren) {
   return <th className="px-2 py-3 text-left">{children}</th>;
}
