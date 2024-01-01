import Link from "next/link";

export interface FooterLinksProps {
   sectionLinkArray: Array<{ link: string; title: string }>;
   sectionTitle: string;
}

export default function FooterLinks({ sectionLinkArray, sectionTitle }: FooterLinksProps) {
   return (
      <div className="flex flex-col gap-y-1">
         <p className="mb-2 font-semibold">{sectionTitle}</p>
         {sectionLinkArray.map(({ link, title }) => (
            <Link key={title} href={link} className="text-muted-foreground text-sm md:text-base">
               {title}
            </Link>
         ))}
      </div>
   );
}
