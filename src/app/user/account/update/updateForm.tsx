"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@root/components/ui";

const updateFormSchema = z.object({
   name: z.string().min(1, { message: "Required field" }),
   email: z.string().min(1, { message: "Required field" }).email({ message: "Please enter a valid e-mail" }),
});

export type UpdateFormType = z.infer<typeof updateFormSchema>;

export default function UpdateForm() {
   const updateForm = useForm<UpdateFormType>({
      resolver: zodResolver(updateFormSchema),
      defaultValues: { email: "", name: "" },
   });

   function onUpdate(values: UpdateFormType) {}

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
            <Button type="submit" className="w-full">
               Update
            </Button>
         </form>
      </Form>
   );
}
