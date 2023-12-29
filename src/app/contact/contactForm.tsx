"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Textarea } from "@root/components/ui";

const contactFormSchema = z.object({
   name: z.string().min(1, { message: "Required field" }),
   email: z.string().min(1, { message: "Required field" }).email({ message: "Please enter a valid e-mail" }),
   subject: z.string().min(5, { message: "Minimum 5 characters" }),
   message: z.string().min(20, { message: "Minimum 20 characters" }),
});

export type ContactFormType = z.infer<typeof contactFormSchema>;

export interface ContactFormProps {
   name: string;
   email: string;
}

export default function ContactForm({ email, name }: ContactFormProps) {
   const contactForm = useForm<ContactFormType>({
      resolver: zodResolver(contactFormSchema),
      defaultValues: { email, name, message: "", subject: "" },
   });

   function onContact(values: ContactFormType) {}

   return (
      <Form {...contactForm}>
         <form onSubmit={contactForm.handleSubmit(onContact)} className="space-y-5">
            <FormField
               control={contactForm.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Name</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. John Doe" {...field} disabled={!!name} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={contactForm.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>E-mail</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. johndoe@gmail.com" {...field} disabled={!!email} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={contactForm.control}
               name="subject"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Subject</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. Feedback on awesome services" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={contactForm.control}
               name="message"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Enter your message</FormLabel>
                     <FormControl>
                        <Textarea placeholder="e.g. Feedback on awesome services" {...field} className="min-h-44" />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" className="w-full">
               Submit
            </Button>
         </form>
      </Form>
   );
}
