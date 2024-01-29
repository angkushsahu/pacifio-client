"use client";

import { useEffect, useState } from "react";

import { AdminSearch, AdminTable } from "@root/components/custom";
import { useGetAllProductsForAdmin } from "@root/hooks";
import type { ProductStockType } from "@root/types";
import isOutofStock from "./isOutofStock";
import { formatNumber } from "@root/lib";
import ProductActions from "./actions";
import Loading from "../loading";

const headContents = ["Name", "Price", "Category", "Stock"];

export interface ParentComponentProps {
   stock: ProductStockType;
   token: string;
}

export default function ParentComponent({ stock, token }: ParentComponentProps) {
   const [page, setPage] = useState(1);
   const [value, setValue] = useState("");
   const [deferredValue, setDeferredValue] = useState("");

   useEffect(() => {
      const timeout = setTimeout(() => {
         setDeferredValue(value);
      }, 750);

      return () => clearTimeout(timeout);
   }, [value]);

   const { data: response } = useGetAllProductsForAdmin({
      pageNumber: page,
      token,
      stock: stock === "empty" ? "false" : "true",
      query: deferredValue,
   });
   if (!response) return <Loading />;

   const { numberOfFetchedProducts, products, totalProducts } = response.data;
   const totalPages = numberOfFetchedProducts && totalProducts ? Math.ceil(totalProducts / numberOfFetchedProducts) : 0;
   const currentPage = numberOfFetchedProducts && totalProducts ? page : 0;

   const productTableContents = products.map((product) => ({
      name: product.name,
      price: `₹ ${formatNumber(product.price)}`,
      category: product.category[0].toUpperCase() + product.category.substring(1),
      stock: formatNumber(product.stock),
      id: product.id,
   }));
   const bodyKeys = productTableContents[0] ? Object.keys(productTableContents[0]) : [];

   return (
      <div>
         <h1 className="font-semibold text-3xl">{isOutofStock(stock)} Products</h1>
         <AdminSearch setValue={setValue} value={value} placeholder={`Search ${isOutofStock(stock)} Products ....`} />
         <AdminTable
            bodyElements={productTableContents}
            bodyKeys={bodyKeys}
            headElements={headContents}
            currentPage={currentPage}
            totalPages={totalPages}
            Actions={ProductActions}
            setPage={setPage}
            parentPage="Products"
            token={token}
         />
      </div>
   );
}
