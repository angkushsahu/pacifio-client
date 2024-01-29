export default function getFolderNameForCloudinary({ productName }: { productName: string }) {
   const folderName = productName.split(" ").slice(0, 4).join("-");
   return `pacifio/products/${folderName}`;
}
