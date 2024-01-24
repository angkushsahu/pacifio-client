"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@root/components/ui";
import { type SignupFormType, type AuthenticateUserType, signupFormSchema } from "@root/validations";
import { loginUrl } from "@root/constants";
import { nextAuthSignin } from "@root/lib";
import { useSignup } from "@root/hooks";

export default function SignupForm() {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const signupForm = useForm<SignupFormType>({
      resolver: zodResolver(signupFormSchema),
      defaultValues: { email: "", name: "", password: "", confirmPassword: "" },
   });

   function onSuccess(response: AuthenticateUserType) {
      signupForm.reset();
      const { data, message } = response;
      nextAuthSignin({ message, token: data.token, user: data.user });
   }
   const { mutate: signupUser, isPending } = useSignup({ onSuccess });

   function onSignup(values: SignupFormType) {
      if (isPending) return;
      signupUser(values);
   }

   return (
      <>
         <Form {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-6">
               <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>User Name</FormLabel>
                        <FormControl>
                           <Input placeholder="e.g. John Doe" {...field} type="text" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={signupForm.control}
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
                  control={signupForm.control}
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
                  control={signupForm.control}
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
                  Signup
               </Button>
            </form>
         </Form>
         <div className="mt-4 text-center text-sm text-custom-foreground">
            <Link href={loginUrl}>Registered already ? Login instead</Link>
         </div>
      </>
   );
}
