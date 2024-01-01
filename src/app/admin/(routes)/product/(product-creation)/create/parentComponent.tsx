import ProductForm from "../../productForm";

export default function ParentComponent() {
   return (
      <main className="min-h-section max-w-xl mx-auto pt-4">
         <h1 className="font-semibold text-3xl mb-6">Create Product</h1>
         <ProductForm category="" description="" name="" price={0} stock={0} isCreateRoute />
      </main>
   );
}
