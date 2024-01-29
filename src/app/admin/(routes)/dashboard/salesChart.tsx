"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { SalesChartLoader } from "./sectionLoaders";
import { useSalesGraph } from "@root/hooks";

export default function SalesChart({ token }: { token: string }) {
   const { data: salesData } = useSalesGraph({ enabled: true, token });

   return (
      <div className="my-6">
         <h3 className="text-2xl font-semibold mb-6">Sales</h3>
         {salesData?.data.monthlySales ? (
            <ResponsiveContainer width="100%" height={400}>
               <BarChart data={salesData.data.monthlySales}>
                  <XAxis dataKey="name" stroke="#000000" fontSize={14} tickLine={false} axisLine={false} />
                  <YAxis
                     stroke="#000000"
                     fontSize={14}
                     tickLine={false}
                     axisLine={false}
                     tickFormatter={(value) => `₹ ${value}`}
                  />
                  <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-custom-light" />
               </BarChart>
            </ResponsiveContainer>
         ) : (
            <SalesChartLoader />
         )}
      </div>
   );
}
