"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { email, z } from "zod";
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
import axiosInstance from "@/lib/api/axiosInstance";
import { showError, showSuccess, showWarning } from "@/util/styles/toast-utils";
import LoadingScreen from "@/components/loading/LoadingScreen";
import { useRouter } from "next/navigation";

const RecoveryPasswordPage = () => {
  const router = useRouter();
  const [disableInput, setDisableInput] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
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

  const handleSendOtp = async (): Promise<void> => {
    setLoading(true);
    const email = form.getValues("email");
    if (!email) {
      showWarning("Please enter your email");
      return;
    }
    await axiosInstance
      .post("/auth/otp/recoveryPassword", {
        email,
      })
      .then(() => {
        showSuccess("OTP sent successfully!");
        setDisableInput(false);
      })
      .catch((error) => {
        console.log(error);
        showError("Failed to send OTP");
      })
      .finally(() => setLoading(false));
  };

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    // Lấy dữ liệu
    const { email, otpCode, password } = values;

    setLoading(true);
    await axiosInstance
      .put("auth/recoveryPassword", {
        email,
        otp: otpCode,
        new_password: password, // sửa lại cho đúng
      })
      .then((res) => {
        showSuccess(res.data.message || "Password updated successfully!");
        router.push("/");
      })
      .catch((error) => {
        // Lấy message lỗi từ response server
        const msg =
          error.response?.data?.error ||
          "Failed to update password. Please try again.";
        console.log(error);
        showError(msg);
      })
      .finally(() => {
        setLoading(false);
      });
    console.log(values);
  };

  return (
    <div className="max-w-[1230px]  mx-auto px-4 py-6 flex justify-center">
      {loading && <LoadingScreen />}
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

              <TransparentButton
                content="Send OTP to Email"
                type="button"
                handleTodo={handleSendOtp}
              />

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
