import { useQueryClient } from "@tanstack/react-query";
import { CldUploadButton } from "next-cloudinary";
import Link from "next/link";

import { baseAdminSelectDefaultProductImageUrl, getProductQueryKey } from "@root/constants";
import type { ProductImageType, ProductImageResponseType } from "@root/validations";
import type { CloudinaryResultsType } from "@root/types";
import type { ChildProps } from "./parentComponent";
import { Button, toast } from "@root/components/ui";
import { useAddImage } from "@root/hooks";

export interface UploadImageProps extends ChildProps {
   images: Array<ProductImageType>;
   folderName: string;
}

export default function UploadImage({ folderName, images, productId, token }: UploadImageProps) {
   const queryClient = useQueryClient();

   function onSuccess(response: ProductImageResponseType) {
      toast({ title: response.message });
      queryClient.setQueryData([getProductQueryKey, response.data.product.id], () => response);
   }
   const { mutate: addImageMutation, isPending } = useAddImage({ onSuccess });

   function onImageUpload(e: CloudinaryResultsType) {
      if (e.event === "success") {
         const { public_id, secure_url } = e.info;
         addImageMutation({ id: productId, token, values: { publicUrl: public_id, secureUrl: secure_url } });
      }
   }

   return (
      <div className="flex flex-col gap-y-4 items-center justify-center">
         <Button
            asChild
            variant={images.length >= 1 ? "outline" : "default"}
            className="border-2 border-custom-foreground w-48"
            disabled={isPending}
         >
            <CldUploadButton
               uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
               onUpload={(e) => onImageUpload(e as CloudinaryResultsType)}
               options={{ folder: folderName, maxFiles: 4 }}
            >
               {images.length >= 1 ? "Upload More Images" : "Upload Image"}
            </CldUploadButton>
         </Button>
         {images.length >= 1 ? (
            <Link href={`${baseAdminSelectDefaultProductImageUrl}/${productId}`}>
               <Button className="w-48">Done</Button>
            </Link>
         ) : null}
      </div>
   );
}
