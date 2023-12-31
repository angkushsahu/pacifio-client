export default function isOutofStock(stock: string) {
   switch (stock) {
      case "empty":
         return "Out of Stock";
      case "non-empty":
         return "In Stock";
      default:
         return "Admin";
   }
}
