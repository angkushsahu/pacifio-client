"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@root/components/ui";

const changePasswordFormSchema = z
   .object({
      password: z.string().min(1, { message: "Required field" }),
      confirmPassword: z.string().min(1, { message: "Required field" }),
   })
   .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });

export type ChangePasswordFormType = z.infer<typeof changePasswordFormSchema>;

export default function ChangePasswordForm() {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const changePasswordForm = useForm<ChangePasswordFormType>({
      resolver: zodResolver(changePasswordFormSchema),
      defaultValues: { password: "", confirmPassword: "" },
   });

   function onChangePassword(values: ChangePasswordFormType) {}

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
            <Button type="submit" className="w-full">
               Update
            </Button>
         </form>
      </Form>
   );
}
