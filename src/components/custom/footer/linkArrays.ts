import { aboutUrl, allOrdersUrl, contactUrl, productsUrl, shoppingBagUrl, userAccountUrl } from "@root/constants/routes";
import { categories } from "@root/constants/categories";

export const companyLinks = [
   { title: "About", link: aboutUrl },
   { title: "Contact", link: contactUrl },
];

export const userLinks = [
   { title: "Shopping Bag", link: shoppingBagUrl },
   { title: "Account", link: userAccountUrl },
   { title: "Your Orders", link: allOrdersUrl },
];

export const categoryLinks = categories.map((category) => ({
   title: category.title,
   link: `${productsUrl}?category=${category.link}`,
}));
