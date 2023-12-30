import ShowAllAddress from "./showAllAddress";
import EmptyAddress from "./emptyAddress";

export default function AddressParent() {
   const isAddressEmpty = false;

   if (isAddressEmpty) return <EmptyAddress />;

   return (
      <main className="min-h-section center-layout px-5 pt-8 pb-12">
         <h1 className="font-semibold text-3xl mb-6">Saved addresses</h1>
         <ShowAllAddress />
      </main>
   );
}
