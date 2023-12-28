import { CornerDownLeft, Plane, Smile, Truck } from "lucide-react";

export default function Experiences() {
   const experienceSections = [
      {
         Icon: CornerDownLeft,
         title: "Original Products",
         description: "We provide money back gurantee if the product is not original",
      },
      {
         Icon: Smile,
         title: "Satisfaction Gurantee",
         description: "Exchange the product you've purchased if you don't like it",
      },
      {
         Icon: Plane,
         title: "New Arrival Everyday",
         description: "We update our collections almost everyday",
      },
      {
         Icon: Truck,
         title: "Fast Shipping",
         description: "We offer blazing fast shipping for our loyal customers",
      },
   ];

   return (
      <section className="center-layout px-5 py-12">
         <h2 className="font-semibold text-2xl mb-5">We provide best Experiences</h2>
         <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(18.25rem,1fr))] gap-5">
            {experienceSections.map((experience) => (
               <article key={experience.title} className="bg-custom hover:bg-custom-hover p-5 rounded-md shadow-md">
                  <div className="p-3 rounded-md bg-custom-marker inline-block">
                     <experience.Icon className="text-custom-foreground w-7 h-7" />
                  </div>
                  <p className="font-semibold text-lg mt-3 mb-1">{experience.title}</p>
                  <p>{experience.description}</p>
               </article>
            ))}
         </div>
      </section>
   );
}
