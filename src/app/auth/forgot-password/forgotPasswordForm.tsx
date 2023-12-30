"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@root/components/ui";

const forgotPasswordFormSchema = z.object({
   email: z.string().min(1, { message: "Required field" }).email({ message: "Please enter a valid e-mail" }),
});

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordFormSchema>;

export default function ForgotPasswordForm() {
   const forgotPasswordForm = useForm<ForgotPasswordFormType>({
      resolver: zodResolver(forgotPasswordFormSchema),
      defaultValues: { email: "" },
   });

   function onForgotPassword(values: ForgotPasswordFormType) {}

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
            <Button type="submit" className="w-full">
               Submit
            </Button>
         </form>
      </Form>
   );
}
