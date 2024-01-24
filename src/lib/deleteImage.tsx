"use server";

import { v2 as cloudinary } from "cloudinary";

export default async function deleteImage({ publicUrl }: { publicUrl: string }) {
   try {
      await cloudinary.uploader.destroy(publicUrl);
      return true;
   } catch (error: unknown) {
      if (error instanceof Error) throw new Error("Unable to delete image, please try again");
   }
}
