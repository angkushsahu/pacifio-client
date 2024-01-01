"use server";

import { v2 as cloudinary } from "cloudinary";

export default async function deleteImage({ publicId }: { publicId: string }) {
   try {
      await cloudinary.uploader.destroy(publicId);
      return true;
   } catch (error: unknown) {
      if (error instanceof Error) throw new Error("Unable to delete image, please try again");
   }
}
