import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@root/components/ui";
import type { FormComponentProps } from "./index";

export default function AddressFormComponent({ addressForm, disabled, onAddressEdit }: FormComponentProps) {
   return (
      <Form {...addressForm}>
         <form onSubmit={addressForm.handleSubmit(onAddressEdit)} className="space-y-5">
            <FormField
               control={addressForm.control}
               name="contactNumber"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Contact Number</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. xxxx-yyy-zzz" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={addressForm.control}
               name="location"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Location</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. abc colony, xyz road, some random suffix" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={addressForm.control}
               name="city"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>City</FormLabel>
                     <FormControl>
                        <Input placeholder="City in which you live" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={addressForm.control}
               name="state"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>State</FormLabel>
                     <FormControl>
                        <Input placeholder="State in which you live" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={addressForm.control}
               name="pincode"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Pincode</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. 123456" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={addressForm.control}
               name="country"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Country</FormLabel>
                     <FormControl>
                        <Input placeholder="Country in which you live" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" className="w-full" disabled={disabled}>
               Submit
            </Button>
         </form>
      </Form>
   );
}
