"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, toast } from "@root/components/ui";
import { type ForgotPasswordFormType, forgotPasswordFormSchema, type ResponseType } from "@root/validations";
import { useForgotPassword } from "@root/hooks";

export default function ForgotPasswordForm() {
   const forgotPasswordForm = useForm<ForgotPasswordFormType>({
      resolver: zodResolver(forgotPasswordFormSchema),
      defaultValues: { email: "" },
   });

   function onSuccess(data: ResponseType) {
      forgotPasswordForm.reset();
      toast({ title: data.message });
   }
   const { mutate: forgotPassword, isPending } = useForgotPassword({ onSuccess });

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
