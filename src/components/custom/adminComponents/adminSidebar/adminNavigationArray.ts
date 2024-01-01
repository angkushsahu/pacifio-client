import {
   adminCreateProductUrl,
   adminDeliveredOrdersUrl,
   adminInStockProductsUrl,
   adminOutOfStockProductsUrl,
   adminProcessingOrdersUrl,
   adminShippedOrdersUrl,
   adminUserRoleAdminUrl,
   adminUserRoleRegularUrl,
} from "@root/constants/routes";
import { Ban, Package, Plus, RefreshCw, ShoppingCart, Truck, UserCog, Users } from "lucide-react";

const adminNavigation = [
   {
      title: "Users",
      links: [
         { Icon: Users, type: "Regular", link: adminUserRoleRegularUrl },
         { Icon: UserCog, type: "Admin", link: adminUserRoleAdminUrl },
      ],
   },
   {
      title: "Products",
      links: [
         { Icon: Plus, type: "Add Product", link: adminCreateProductUrl },
         { Icon: ShoppingCart, type: "In-stock Products", link: adminInStockProductsUrl },
         { Icon: Ban, type: "Out-of-stock Products", link: adminOutOfStockProductsUrl },
      ],
   },
   {
      title: "Orders",
      links: [
         { Icon: RefreshCw, type: "Processing", link: adminProcessingOrdersUrl },
         { Icon: Package, type: "Shipped", link: adminShippedOrdersUrl },
         { Icon: Truck, type: "Delivered", link: adminDeliveredOrdersUrl },
      ],
   },
];

export default adminNavigation;
