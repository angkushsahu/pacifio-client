"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@root/components/ui";
import { type ContactFormType, contactFormSchema, type ResponseType } from "@root/validations";
import { Button, Input, Textarea, toast } from "@root/components/ui";
import { useContactHook } from "@root/hooks";

export default function ContactForm() {
   const contactForm = useForm<ContactFormType>({
      resolver: zodResolver(contactFormSchema),
      defaultValues: { email: "", name: "", message: "", subject: "" },
   });

   function onSuccess(response: ResponseType) {
      contactForm.reset();
      toast({ title: response.message });
   }
   const { mutate: sendMail, isPending } = useContactHook({ onSuccess });

   function onContact(values: ContactFormType) {
      if (isPending) return;
      sendMail(values);
   }

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
                        <Input placeholder="e.g. John Doe" {...field} />
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
                        <Input placeholder="e.g. johndoe@gmail.com" {...field} />
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
            <Button type="submit" className="w-full" disabled={isPending}>
               Submit
            </Button>
         </form>
      </Form>
   );
}
