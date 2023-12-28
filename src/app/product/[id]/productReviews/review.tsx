"use client";

import { useState } from "react";

export interface ReviewProps {
   userName: string;
   rating: number;
   maxRating: number;
   description: string;
}

export default function Review({ description, maxRating, rating, userName }: ReviewProps) {
   const [readMore, setReadMore] = useState(false);
   const isDescriptionLong = description.length > 100;
   const shortenedDescription = isDescriptionLong ? description.substring(0, 100) + "...." : description;

   return (
      <article className="bg-custom hover:bg-custom-hover shadow-sm rotate-180 place-self-start">
         <div className="shadow-lg rotate-180 p-5">
            <p className="font-medium">{userName}</p>
            <p className="my-3 text-custom-foreground font-medium">
               {rating} out of {maxRating}
            </p>
            <p className="mb-3">{readMore ? description : shortenedDescription}</p>
            {isDescriptionLong ? (
               <span className="cursor-pointer text-custom-foreground" onClick={() => setReadMore((prev) => !prev)}>
                  Read {readMore ? "Less" : "More ...."}
               </span>
            ) : null}
         </div>
      </article>
   );
}
