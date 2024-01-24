"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@root/components/ui";
import { type AuthenticateUserType, type LoginFormType, loginFormSchema } from "@root/validations";
import { forgotPasswordUrl, signupUrl } from "@root/constants";
import { nextAuthSignin } from "@root/lib";
import { useLogin } from "@root/hooks";

export default function LoginForm() {
   const [showPassword, setShowPassword] = useState(false);

   const loginForm = useForm<LoginFormType>({
      resolver: zodResolver(loginFormSchema),
      defaultValues: { email: "", password: "" },
   });

   function onSuccess(response: AuthenticateUserType) {
      loginForm.reset();
      const { data, message } = response;
      nextAuthSignin({ message, token: data.token, user: data.user });
   }
   const { mutate: loginUser, isPending } = useLogin({ onSuccess });

   async function onLogin(values: LoginFormType) {
      if (isPending) return;
      loginUser(values);
   }

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
               <Button type="submit" className="w-full" disabled={isPending}>
                  Login
               </Button>
            </form>
         </Form>
         <div className="mt-4 text-center text-sm text-custom-foreground">
            <Link href={signupUrl}>Create a new account instead ?</Link>
         </div>
      </>
   );
}
