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
import { Input } from "../ui/input";
import PrimaryButton from "../customs/PrimaryButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Image from "next/image";

const OrderPaymentForm = () => {
  const formSchema = z.object({
    paymentMethod: z
      .string()
      .nonempty({ message: "payment không được để trống." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: "cod",
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
          Payment Method
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full min-w-[300px] mt-4"
          >
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-2 "
                      defaultValue="cod"
                    >
                      {/* <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="VN PAY"
                            className="cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          <Image
                            src="https://cdn1.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_vnpay.svg?q=11294"
                            width={40}
                            height={24}
                            alt="vn pay"
                          />
                          VN PAY
                        </FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="paypal"
                            className="cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          <Image
                            src="https://cdn1.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_vnpay.svg?q=11294"
                            width={40}
                            height={24}
                            alt="vn pay"
                          />
                          PayPal
                        </FormLabel>
                      </FormItem> */}

                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="cod"
                            className="cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          <Image
                            src="https://cdn1.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_cashondelivery.svg?q=11294"
                            width={40}
                            height={24}
                            alt="vn pay"
                          />
                          Cash on Delivery
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
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

export default OrderPaymentForm;
