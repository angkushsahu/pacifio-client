export default function formatNumber(num: number, paise: boolean = true): string {
   let formattedNumber = num.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
   });

   if (paise) formattedNumber = formattedNumber.substring(0, formattedNumber.length - 3);
   return formattedNumber.substring(1);
}
