import { Fan, Headphones, Keyboard, Mouse, Square } from "lucide-react";

export const categories = [
   { Icon: Mouse, title: "Mouse", link: "mouse" },
   { Icon: Headphones, title: "Headset", link: "headset" },
   { Icon: Keyboard, title: "Keyboard", link: "keyboard" },
   { Icon: Square, title: "Mouse Pad", link: "mouse-pad" },
   { Icon: Fan, title: "Cooling Pad", link: "cooling-pad" },
];

export type CategoryType = "mouse" | "cooling-pad" | "mouse-pad" | "keyboard" | "headset";
