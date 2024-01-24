import type { Dispatch, SetStateAction } from "react";

import { Button } from "@root/components/ui";
import TD from "./td";
import TH from "./th";

export interface AdminTableProps {
   Actions: ({ id, token }: { id: string; token: string }) => JSX.Element;
   bodyElements: Array<Record<string, string | number>>;
   headElements: Array<string>;
   currentPage: number;
   totalPages: number;
   setPage: Dispatch<SetStateAction<number>>;
   parentPage: string;
   token: string;
}

export default function AdminTable(props: AdminTableProps) {
   const { Actions, bodyElements, currentPage, headElements, parentPage, setPage, totalPages, token } = props;

   function goToPreviousPage() {
      setPage((currentPage) => {
         if (currentPage <= 1) return currentPage;
         return currentPage - 1;
      });
   }

   function goToNextPage() {
      setPage((currentPage) => {
         if (currentPage >= totalPages) return currentPage;
         return currentPage + 1;
      });
   }

   return (
      <>
         <table className="w-full">
            <thead className="bg-custom-marker hidden lg:table-header-group">
               <tr>
                  {headElements.map((element) => (
                     <TH key={element}>{element}</TH>
                  ))}
                  <TH>Actions</TH>
               </tr>
            </thead>
            <tbody className="space-y-6 lg:space-y-0">
               {!bodyElements.length ? (
                  <tr className="">
                     <TD colSpan={10}>
                        <div className="text-center">No {parentPage} Found ....</div>
                     </TD>
                  </tr>
               ) : (
                  bodyElements.map((rows) => (
                     <tr key={rows.id} className="flex flex-col lg:table-row lg:even:bg-custom-hover border-2 lg:border-none">
                        {headElements.map((element, idx) => (
                           <TD key={`${rows.id} - ${element}`}>
                              <span className="font-semibold lg:hidden">{headElements[idx]} : </span>
                              <span className="break-all">{rows[element.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "")]}</span>
                           </TD>
                        ))}
                        <TD>{Actions ? <Actions id={rows.id as string} token={token} /> : null}</TD>
                     </tr>
                  ))
               )}
            </tbody>
         </table>
         {!currentPage || !totalPages ? null : (
            <div className="mt-5 flex items-center justify-end gap-x-6">
               <span>
                  Page {currentPage} - {totalPages}
               </span>
               {currentPage <= 1 ? null : (
                  <Button variant="secondary" onClick={goToPreviousPage}>
                     Previous
                  </Button>
               )}
               {currentPage >= totalPages ? null : (
                  <Button variant="secondary" onClick={goToNextPage}>
                     Next
                  </Button>
               )}
            </div>
         )}
      </>
   );
}
