"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";

const OrderNote = () => {
  const formSchema = z.object({
    note: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    console.log(values);
  };
  return (
    <div className="flex w-full justify-center my-4">
      <div className="w-full bg-white p-4">
        <div className="py-4 text-[16px] font-bold uppercase w-full border-b border-[#ccc]">
          Note
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full min-w-[300px] mt-4"
          >
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="text-[var(--text)] mr-2 w-[30%]">
                    Note
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Press note"
                      {...field}
                      autoComplete="current-note"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OrderNote;
