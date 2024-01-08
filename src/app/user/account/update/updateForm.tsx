"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { AxiosError } from "axios";
import { z } from "zod";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, toast } from "@root/components/ui";
import { userAccountUrl } from "@root/constants/routes";
import type { AuthenticateUser } from "@root/types";
import { errorSchema } from "@root/validations";
import { useUpdateUser } from "@root/hooks";

const updateFormSchema = z.object({
   name: z.string().min(1, { message: "Required field" }),
   email: z.string().min(1, { message: "Required field" }).email({ message: "Please enter a valid e-mail" }),
});

export type UpdateFormType = z.infer<typeof updateFormSchema>;

export default function UpdateForm() {
   const router = useRouter();
   const { data: session, update: updateUserAuthSession } = useSession();
   if (!session || !session.user || !session.token) return <></>;

   const updateForm = useForm<UpdateFormType>({
      resolver: zodResolver(updateFormSchema),
      defaultValues: { email: session.user.email, name: session.user.name },
   });

   async function onSuccess(data: AuthenticateUser) {
      if (session?.user) await updateUserAuthSession({ ...session, user: { ...session.user, ...data.data.user } });
      toast({ title: data.message });
      router.push(userAccountUrl);
   }
   function onError(error: AxiosError) {
      const validatedError = errorSchema.safeParse(error.response?.data);
      if (validatedError.success) toast({ title: validatedError.data.message, variant: "destructive" });
      else toast({ title: error.message, variant: "destructive" });
   }

   const { mutate: updateUser, isPending } = useUpdateUser({ onError, onSuccess });

   function onUpdate(values: UpdateFormType) {
      if (isPending) return;
      if (session?.token) updateUser({ token: session.token as string, values });
   }

   return (
      <Form {...updateForm}>
         <form onSubmit={updateForm.handleSubmit(onUpdate)} className="space-y-6">
            <FormField
               control={updateForm.control}
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
               control={updateForm.control}
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
               Update
            </Button>
         </form>
      </Form>
   );
}
