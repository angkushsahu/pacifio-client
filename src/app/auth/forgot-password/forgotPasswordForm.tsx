"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { AxiosError } from "axios";
import { z } from "zod";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, toast } from "@root/components/ui";
import type { ResponseData } from "@root/types";
import { errorSchema } from "@root/validations";
import { useForgotPassword } from "@root/hooks";

const forgotPasswordFormSchema = z.object({
   email: z.string().min(1, { message: "Required field" }).email({ message: "Please enter a valid e-mail" }),
});

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordFormSchema>;

export default function ForgotPasswordForm() {
   const forgotPasswordForm = useForm<ForgotPasswordFormType>({
      resolver: zodResolver(forgotPasswordFormSchema),
      defaultValues: { email: "" },
   });

   function onSuccess(data: ResponseData) {
      forgotPasswordForm.reset();
      toast({ title: data.message });
   }
   function onError(error: AxiosError) {
      const validatedError = errorSchema.safeParse(error.response?.data);
      if (validatedError.success) toast({ title: validatedError.data.message, variant: "destructive" });
      else toast({ title: error.message, variant: "destructive" });
   }

   const { mutate: forgotPassword, isPending } = useForgotPassword({ onError, onSuccess });

   function onForgotPassword(values: ForgotPasswordFormType) {
      if (isPending) return;
      forgotPassword(values);
   }

   return (
      <Form {...forgotPasswordForm}>
         <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPassword)} className="space-y-6">
            <FormField
               control={forgotPasswordForm.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>User E-mail</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. johndoe@gmail.com" {...field} type="email" />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
               Submit
            </Button>
         </form>
      </Form>
   );
}
