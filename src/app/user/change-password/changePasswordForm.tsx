"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, toast } from "@root/components/ui";
import { changePasswordFormSchema, type ChangePasswordFormType, type ResponseType } from "@root/validations";
import { userAccountUrl } from "@root/constants";
import { useChangePassword } from "@root/hooks";

export default function ChangePasswordForm({ token }: { token: string }) {
   const router = useRouter();
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const changePasswordForm = useForm<ChangePasswordFormType>({
      resolver: zodResolver(changePasswordFormSchema),
      defaultValues: { password: "", confirmPassword: "" },
   });

   function onSuccess(response: ResponseType) {
      changePasswordForm.reset();
      toast({ title: response.message });
      router.push(userAccountUrl);
   }
   const { mutate: changePassword, isPending } = useChangePassword({ onSuccess });

   function onChangePassword(values: ChangePasswordFormType) {
      if (isPending) return;
      changePassword({ values, token });
   }

   return (
      <Form {...changePasswordForm}>
         <form onSubmit={changePasswordForm.handleSubmit(onChangePassword)} className="space-y-6">
            <FormField
               control={changePasswordForm.control}
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
               control={changePasswordForm.control}
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
               Update
            </Button>
         </form>
      </Form>
   );
}
