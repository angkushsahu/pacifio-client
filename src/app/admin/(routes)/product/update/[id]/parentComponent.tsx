import { Tabs, TabsContent, TabsList, TabsTrigger } from "@root/components/ui";
import ProductForm from "../../productForm";
import AdminUpdateProductImage from "./updateImage";

export interface ParentComponentProps {
   productId: string;
}

export default function ParentComponent({ productId }: ParentComponentProps) {
   return (
      <main className="min-h-section max-w-3xl mx-auto pt-4">
         <h1 className="font-semibold text-3xl mb-6">Update Product</h1>
         <Tabs defaultValue="Info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
               <TabsTrigger value="Info">Info</TabsTrigger>
               <TabsTrigger value="Images">Images</TabsTrigger>
            </TabsList>
            <TabsContent value="Info">
               <div className="mt-6">
                  <ProductForm category="" description="" name="" price={0} stock={0} />
               </div>
            </TabsContent>
            <TabsContent value="Images">
               <div className="mt-6">
                  <AdminUpdateProductImage productId={productId} />
               </div>
            </TabsContent>
         </Tabs>
      </main>
   );
}
