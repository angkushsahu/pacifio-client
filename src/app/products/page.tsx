import type { Metadata } from "next";

import ProductsParent from "./productsParent";

export const metadata: Metadata = {
   title: "Products - Pacifio",
};

export default function Products() {
   return <ProductsParent />;
}
