"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, toast } from "@root/components/ui";
import { resetPasswordFormSchema, type ResponseType, type ResetPasswordFormType } from "@root/validations";
import { useResetPassword } from "@root/hooks";
import { loginUrl } from "@root/constants";

export default function ResetPasswordForm({ resetId }: { resetId: string }) {
   const router = useRouter();
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const resetPasswordForm = useForm<ResetPasswordFormType>({
      resolver: zodResolver(resetPasswordFormSchema),
      defaultValues: { password: "", confirmPassword: "" },
   });

   function onSuccess(data: ResponseType) {
      resetPasswordForm.reset();
      toast({ title: data.message });
      router.replace(loginUrl);
   }
   const { mutate: resetPassword, isPending } = useResetPassword({ onSuccess });

   function onResetPassword(values: ResetPasswordFormType) {
      if (isPending) return;
      resetPassword({ ...values, resetId });
   }

   return (
      <Form {...resetPasswordForm}>
         <form onSubmit={resetPasswordForm.handleSubmit(onResetPassword)} className="space-y-6">
            <FormField
               control={resetPasswordForm.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Password</FormLabel>
                     <div className="relative isolate">
                        <FormControl>
                           <Input
                              placeholder="Enter a strong password"
                              {...field}
                              type={showPassword ? "text" : "password"}
                              className="pr-10"
                           />
                        </FormControl>
                        <span
                           className="absolute top-1/2 right-3 left-auto -translate-y-1/2 cursor-pointer"
                           onClick={() => setShowPassword((prev) => !prev)}
                        >
                           {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                     </div>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={resetPasswordForm.control}
               name="confirmPassword"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Confirm Password</FormLabel>
                     <div className="relative isolate">
                        <FormControl>
                           <Input
                              placeholder="Re-enter your password"
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              className="pr-10"
                           />
                        </FormControl>
                        <span
                           className="absolute top-1/2 right-3 left-auto -translate-y-1/2 cursor-pointer"
                           onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                           {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                     </div>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
               Reset
            </Button>
         </form>
      </Form>
   );
}
