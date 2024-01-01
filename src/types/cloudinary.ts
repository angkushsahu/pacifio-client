export interface CloudinaryResultsType {
   event: "success" | "error";
   info: {
      public_id: string;
      secure_url: string;
   };
}

export type ImageInfoType = CloudinaryResultsType["info"];
