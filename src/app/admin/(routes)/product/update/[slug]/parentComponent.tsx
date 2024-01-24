"use client";

import AdminProductDefaultImage from "../../(product-creation)/select-default-image/[slug]/parentComponent";
import AdminProductImageUpload from "../../(product-creation)/image-upload/[slug]/parentComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@root/components/ui";
import ProductForm from "../../productForm";
import { useGetProduct } from "@root/hooks";
import Loading from "../../../loading";

export interface ParentComponentProps {
   productId: string;
   token: string;
}

export default function ParentComponent({ productId, token }: ParentComponentProps) {
   const { data } = useGetProduct({ enabled: true, id: productId });
   if (!data) return <Loading />;
   const { product } = data.data;

   const tabItems = [
      { title: "Info", component: <ProductForm {...product} token={token} productId={productId} /> },
      { title: "Upload Images", component: <AdminProductImageUpload productId={productId} token={token} /> },
      { title: "Select Default Images", component: <AdminProductDefaultImage productId={productId} token={token} /> },
   ];

   return (
      <main className="min-h-section max-w-3xl mx-auto pt-4">
         <h1 className="font-semibold text-3xl mb-6">Update Product</h1>
         <Tabs defaultValue="Info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
               {tabItems.map(({ title }) => (
                  <TabsTrigger key={title} value={title}>
                     {title}
                  </TabsTrigger>
               ))}
            </TabsList>
            {tabItems.map(({ component, title }) => (
               <TabsContent key={title} value={title}>
                  <div className="mt-6">{component}</div>
               </TabsContent>
            ))}
         </Tabs>
      </main>
   );
}
