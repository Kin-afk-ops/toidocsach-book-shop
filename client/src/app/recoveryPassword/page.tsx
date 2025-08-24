"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PrimaryButton from "@/components/customs/PrimaryButton";
import TransparentButton from "@/components/customs/TransparentButton";
import { useState } from "react";

const RecoveryPasswordPage = () => {
  const [disableInput, setDisableInput] = useState<boolean>(true);
  const formSchema = z.object({
    email: z
      .string()
      .nonempty({ message: "Email không được để trống." })
      .email({ message: "Email không hợp lệ." }),

    otpCode: z
      .string()
      .nonempty({ message: "Mã otp không được để trống." })
      .max(6, { message: "Mã otp phải có dài nhất 6 ký tự." }),
    password: z
      .string()
      .nonempty({ message: "Mật khẩu không được để trống." })
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự." }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      otpCode: "",
      password: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    // const loginInfo = values;
    // setLoading(true);
    // await axiosInstance
    //   .post("/login", loginInfo)
    //   .then(async (res) => {
    //     setLoading(false);
    //     setUser({
    //       id: res.data.id,
    //       username: res.data.username,
    //       role: res.data.role,
    //     });
    //     // await setAuthToken(res.data.access_token);
    //     showSuccess("Đăng nhập thành công");
    //     router.push("/");
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     console.log(error);
    //     showError("Đăng nhập thất bại hãy thử lại");
    //   });

    console.log(values);
  };

  return (
    <div className="max-w-[1230px]  mx-auto px-4 py-6 flex justify-center">
      <div className="w-[40%] bg-white flex flex-col items-center rounded">
        <h1 className="uppercase py-4 font-bold text-[18px]">
          Recovery password
        </h1>

        <div className="flex flex-col w-full justify-center mt-2 p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full min-w-[300px]"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2 text-[lg]">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email"
                        {...field}
                        autoComplete="current-email"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <TransparentButton content="Send OTP to Email" />

              <FormField
                control={form.control}
                name="otpCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2 text-[lg]">
                      Confirm OTP code
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="6 characters"
                        {...field}
                        autoComplete="current-otp"
                        disabled={disableInput}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2 text-[lg]">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Password"
                        {...field}
                        type="password"
                        autoComplete="current-password"
                        disabled={disableInput}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <PrimaryButton content="Confirm" type="submit" />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RecoveryPasswordPage;
