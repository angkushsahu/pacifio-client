import { z } from "zod";

export const paymentFormSchema = z
   .object({
      cardNumber: z.string().regex(/^\d{4} - \d{4} - \d{4} - \d{4}$/, {
         message: "Card number must be in XXXX - XXXX - XXXX - XXXX format.",
      }),
      cvv: z.string().min(3, { message: "Enter a valid CVV" }).max(3, { message: "Enter a valid CVV" }),
      expiryDate: z.string().regex(/^\d{2} \/ \d{4}$/, { message: "Card expiry date must be in MM / YYYY format." }),
   })
   .refine(
      ({ cardNumber }) => {
         const digits = cardNumber.replace(/\D/g, "");
         let sum = 0;
         let shouldDouble = false;
         for (let i = digits.length - 1; i >= 0; i--) {
            let digit = parseInt(digits.charAt(i), 10);
            if (shouldDouble) {
               if ((digit *= 2) > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
         }
         return sum % 10 === 0;
      },
      { path: ["cardNumber"], message: "Card number is invalid" }
   )
   .refine(
      ({ expiryDate }) => {
         const [month, year] = expiryDate.split(" / ").map(Number);
         const currentDate = new Date();

         return (
            month >= 1 &&
            month <= 12 &&
            year >= currentDate.getFullYear() &&
            (year > currentDate.getFullYear() || month >= currentDate.getMonth() + 1)
         );
      },
      { path: ["expiryDate"], message: "Card expiry date is invalid or expired." }
   );

export type PaymentFormType = z.infer<typeof paymentFormSchema>;
