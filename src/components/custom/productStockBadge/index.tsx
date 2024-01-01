import { Badge } from "@root/components/ui";

export interface ProductStockBadgeProps {
   inStock?: boolean;
}

export default function ProductStockBadge({ inStock }: ProductStockBadgeProps) {
   return <Badge variant={inStock ? "success" : "destructive"}>{inStock ? "In Stock" : "Out of stock"}</Badge>;
}
