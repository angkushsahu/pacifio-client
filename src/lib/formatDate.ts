export default function formatDate({ date, needHours = false }: { date: Date | string; needHours?: boolean }) {
   let formatTimeOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
   };

   if (needHours) {
      formatTimeOptions.hour = "numeric";
      formatTimeOptions.minute = "2-digit";
   }

   const datifyString = new Date(date);
   const formattedDate = new Intl.DateTimeFormat("en-US", formatTimeOptions).format(datifyString);
   return formattedDate;
}
