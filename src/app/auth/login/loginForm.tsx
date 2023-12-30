"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { z } from "zod";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@root/components/ui";
import { forgotPasswordUrl, signupUrl } from "@root/constants/routes";

const loginFormSchema = z.object({
   email: z.string().min(1, { message: "Required field" }).email({ message: "Please enter a valid e-mail" }),
   password: z.string().min(1, { message: "Required field" }),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
   const [showPassword, setShowPassword] = useState(false);

   const loginForm = useForm<LoginFormType>({
      resolver: zodResolver(loginFormSchema),
      defaultValues: { email: "", password: "" },
   });

   function onLogin(values: LoginFormType) {}

   return (
      <>
         <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-6">
               <FormField
                  control={loginForm.control}
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
               <FormField
                  control={loginForm.control}
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
                        <div className="text-right">
                           <Link href={forgotPasswordUrl} className="text-custom-foreground text-xs">
                              Forgot Password ?
                           </Link>
                        </div>
                     </FormItem>
                  )}
               />
               <Button type="submit" className="w-full">
                  Signup
               </Button>
            </form>
         </Form>
         <div className="mt-4 text-center text-sm text-custom-foreground">
            <Link href={signupUrl}>Create a new account instead ?</Link>
         </div>
      </>
   );
}
