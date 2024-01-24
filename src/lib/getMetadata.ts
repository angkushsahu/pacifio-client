import type { ServerPageProps } from "@root/types";

export interface GetMetadataParams {
   searchParams: ServerPageProps["searchParams"] | null;
   searchParamsKey: string;
   backupTitle: string;
   prefix?: string;
   suffix?: string;
}

export default function getMetadata({ backupTitle, searchParams, searchParamsKey, prefix = "", suffix = "" }: GetMetadataParams) {
   if (!searchParams) return { title: backupTitle };

   let title = searchParams[searchParamsKey];
   if (!title || typeof title !== "string") return { title: backupTitle };

   title = title[0].toUpperCase() + title.substring(1);

   return {
      title: `${prefix} ${title} ${suffix}`,
   };
}
