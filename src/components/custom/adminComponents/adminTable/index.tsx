import { Button } from "@root/components/ui";
import TD from "./td";
import TH from "./th";

export interface AdminTableProps {
   Actions: ({ id }: { id: string }) => JSX.Element;
   bodyElements: Array<Array<string | number>>;
   headElements: Array<string>;
   currentPage: number;
   totalPages: number;
}

export default function AdminTable({ Actions, bodyElements, currentPage, headElements, totalPages }: AdminTableProps) {
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
               {bodyElements.map((rows, idx) => (
                  <tr key={rows[idx]} className="flex flex-col lg:table-row lg:even:bg-custom-hover border-2 lg:border-none">
                     {rows.map((element, idx) => (
                        <TD key={element}>
                           <span className="font-semibold lg:hidden">{headElements[idx]} : </span>
                           <span className="break-all">{element}</span>
                        </TD>
                     ))}
                     <TD>{Actions ? <Actions id="something" /> : null}</TD>
                  </tr>
               ))}
            </tbody>
         </table>
         <div className="mt-5 flex items-center justify-end gap-x-6">
            <span>
               Page {currentPage} - {totalPages}
            </span>
            <Button variant="secondary">Previous</Button>
            <Button variant="secondary">Next</Button>
         </div>
      </>
   );
}
