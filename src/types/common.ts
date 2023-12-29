export interface ServerPageProps {
   params: {
      slug: string;
   };
   searchParams: {
      [key: string]: string | Array<string> | undefined;
   };
}
