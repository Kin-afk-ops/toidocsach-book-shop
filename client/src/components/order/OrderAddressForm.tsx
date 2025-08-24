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

const OrderAddressForm = () => {
  const formSchema = z.object({
    fullname: z.string().nonempty({ message: "Họ tên không được để trống." }),
    phone: z
      .string()
      .nonempty({ message: "Số điện thoại không được để trống." })
      .regex(/^[0-9]{10,11}$/, { message: "Số điện thoại không hợp lệ." }),
    email: z
      .string()
      .nonempty({ message: "Email không được để trống." })
      .email({ message: "Email không hợp lệ." }),
    password: z.string().nonempty({ message: "Mật khẩu không được để trống." }),
    country: z.string().nonempty({ message: "Vui lòng chọn quốc gia." }),
    province: z.string().nonempty({ message: "Vui lòng chọn tỉnh/thành phố." }),

    ward: z.string().nonempty({ message: "Vui lòng chọn phường/xã." }),
    address: z.string().nonempty({ message: "Địa chỉ không được để trống." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      province: "",
      country: "",
      ward: "",
      address: "",
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
          Shipping Address
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full min-w-[300px] mt-4"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="text-[var(--text)] mr-2 w-[30%]">
                    Full name of recipient
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Press full name of recipient"
                      {...field}
                      autoComplete="current-fullname"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="text-[var(--text)] mr-2 w-[30%]">
                    Phone number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 0979123xxx (10 digit)"
                      {...field}
                      autoComplete="current-phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="text-[var(--text)] mr-2 w-[30%]">
                    Country
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || "VN"}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a province" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VN">Vietnam</SelectItem>
                      </SelectContent>

                      <SelectContent>
                        <SelectItem value="orther">Orther</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="text-[var(--text)] mr-2 w-[30%]">
                    Province/City
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a province" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VN">Vietnam</SelectItem>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="JP">Japan</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ward"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="text-[var(--text)] mr-2 w-[30%]">
                    Wards
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a ward" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VN">Vietnam</SelectItem>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="JP">Japan</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="text-[var(--text)] mr-2 w-[30%]">
                    Shipping address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Press shipping address"
                      {...field}
                      autoComplete="current-address"
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

export default OrderAddressForm;
