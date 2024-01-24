"use client";

import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, toast } from "@root/components/ui";
import { type UpdateFormType, type AuthenticateUserType, updateFormSchema } from "@root/validations";
import { getUserQueryKey, userAccountUrl } from "@root/constants";
import { useUpdateUser } from "@root/hooks";

export interface UpdateFormProps {
   name: string;
   email: string;
   token: string;
}

export default function UpdateForm({ email, name, token }: UpdateFormProps) {
   const router = useRouter();
   const queryClient = useQueryClient();

   const updateForm = useForm<UpdateFormType>({
      resolver: zodResolver(updateFormSchema),
      defaultValues: { email, name },
   });

   async function onSuccess(data: AuthenticateUserType) {
      toast({ title: data.message });
      queryClient.setQueryData([getUserQueryKey], () => data);
      router.push(userAccountUrl);
   }
   const { mutate: updateUser, isPending } = useUpdateUser({ onSuccess });

   function onUpdate(values: UpdateFormType) {
      if (isPending) return;
      updateUser({ token, values });
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
