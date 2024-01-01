import { companyLinks, categoryLinks, userLinks } from "./linkArrays";
import FooterLinks from "./footerLinks";
import Logo from "../logo";

export default function Footer() {
   return (
      <footer className="shadow-lg rotate-180 bg-custom">
         <div className="rotate-180 center-layout px-4 py-8 flex flex-col md:flex-row justify-between gap-y-6 gap-x-32">
            <section className="flex-1">
               <Logo />
               <p className="text-muted-foreground mt-2">A store to meet all the needs of your computer setup</p>
            </section>
            <section className="flex flex-wrap gap-y-6 gap-x-16 xl:gap-x-24">
               <FooterLinks sectionLinkArray={companyLinks} sectionTitle="COMPANY" />
               <FooterLinks sectionLinkArray={userLinks} sectionTitle="LINKS" />
               <FooterLinks sectionLinkArray={categoryLinks} sectionTitle="CATEGORIES" />
            </section>
         </div>
      </footer>
   );
}
