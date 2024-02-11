"use server";

import { v2 as cloudinary } from "cloudinary";

export async function deleteImage({ publicUrl }: { publicUrl: string }) {
   try {
      await cloudinary.uploader.destroy(publicUrl);
      return true;
   } catch (error: unknown) {
      if (error instanceof Error) throw new Error("Unable to delete image, please try again");
   }
}

export async function deleteAllProductImagesAndFolder({ folderName }: { folderName: string }) {
   try {
      await cloudinary.api.delete_resources_by_prefix(folderName);
      await cloudinary.api.delete_folder(folderName);
      return true;
   } catch (error: unknown) {
      if (error instanceof Error) throw new Error("Unable to delete image, please try again");
   }
}
