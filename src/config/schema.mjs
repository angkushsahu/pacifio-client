import { z } from "zod";

export const serverSchema = z.object({
   CLOUDINARY_URL: z.string(),
});

export const clientSchema = z.object({
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string(),
});

export const clientEnv = {
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
};
