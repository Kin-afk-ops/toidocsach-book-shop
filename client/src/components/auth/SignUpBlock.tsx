"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
// import { showError, showSuccess } from "@/utils/styles/toast-utils";
// import { useAuthStore } from "../../../store/authStore";
import { useEffect, useState } from "react";
import PrimaryButton from "../customs/PrimaryButton";
import OtpBlock from "./OtpBlock";

const SignUpBlock = () => {
  const router = useRouter();

  //   const user = useAuthStore((state) => state.user);
  // const token = useAuthStore((state) => state.token);
  //   const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [otpMode, setOtpMode] = useState<boolean>(false);
  const [isCounting, setIsCounting] = useState<boolean>(false);

  const formSchema = z
    .object({
      email: z
        .string()
        .nonempty({ message: "Email không được để trống." })
        .email({ message: "Email không hợp lệ." }),
      password: z
        .string()
        .nonempty({ message: "Mật khẩu không được để trống." })
        .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự." }),
      confirmPassword: z
        .string()
        .nonempty({ message: "Xác nhận mật khẩu không được để trống." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Mật khẩu xác nhận không khớp.",
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
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

  const sendOtp = () => {
    setOtpMode(true);
    setIsCounting(true);
  };

  return (
    <div className="flex w-full justify-center mt-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full min-w-[300px]"
        >
          {otpMode ? (
            <OtpBlock isCounting={isCounting} setIsCounting={setIsCounting} />
          ) : (
            <>
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2 text-[lg]">
                      Confirm password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter confirm password"
                        {...field}
                        type="password"
                        autoComplete="current-confirm-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {!otpMode ? (
            <PrimaryButton content="Send OTP to Email" handleTodo={sendOtp} />
          ) : (
            <PrimaryButton content="Sign up" type="submit" />
          )}
        </form>
      </Form>
    </div>
  );
};

export default SignUpBlock;
