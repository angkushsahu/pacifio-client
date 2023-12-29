export default function getCardBackgroundColor(num: number | null | undefined): string {
   if (!num) return "#c0dae9";
   if (num % 4 == 0) return "#2b2b2b";
   if (num % 3 == 0) return "#ffe5e9";
   if (num % 2 == 0) return "#efebec";
   return "#c0dae9";
}
