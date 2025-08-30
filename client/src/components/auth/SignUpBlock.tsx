"use client";

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
import { useState } from "react";
import PrimaryButton from "../customs/PrimaryButton";
import OtpBlock from "./OtpBlock";
import { Eye, EyeClosed } from "lucide-react";
import axiosInstance from "@/lib/api/axiosInstance";
import { showError, showSuccess, showWarning } from "@/util/styles/toast-utils";

interface ChildProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSignInMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpBlock: React.FC<ChildProps> = ({ setLoading, setSignInMode }) => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true);
  const [otpValue, setOtpValue] = useState<string>("");

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
    const registerInfo = values;
    setLoading(true);
    await axiosInstance
      .post("/auth/register", {
        email: registerInfo.email,
        password: registerInfo.password,
        otp: otpValue,
      })
      .then(async (res) => {
        const msg = res.data.message || "Đăng ký thành công!";
        showSuccess(msg);
        setSignInMode(true);
      })
      .catch((error) => {
        console.log(error);
        const errMsg =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Đã có lỗi";

        showError(errMsg);
      })
      .finally(() => {
        setLoading(false);
      });

    console.log(values);
  };

  const handleSendOtp = async (): Promise<void> => {
    setLoading(true);
    const email = form.getValues("email");
    if (!email) {
      showWarning("Please enter your email");
      return;
    }
    await axiosInstance
      .post("/auth/otp", { email })
      .then((res) => {
        const msg = res.data.message || "OTP đã được gửi!";
        showSuccess(msg);
        setOtpMode(true);
        setIsCounting(true);
      })
      .catch((error) => {
        console.log(error);
        const errMsg =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Đã có lỗi khi gửi OTP";

        showError(errMsg);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex w-full justify-center  mt-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full min-w-[300px]"
        >
          {otpMode ? (
            <OtpBlock
              isCounting={isCounting}
              setIsCounting={setIsCounting}
              otpValue={otpValue}
              setOtpValue={setOtpValue}
            />
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
                        placeholder="Nhập email"
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
                    <FormLabel className="mb-2 text-[lg]">Mật khẩu</FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          placeholder="Nhập mật khẩu"
                          {...field}
                          autoComplete="current-password"
                          type={hidePassword ? "password" : "text"}
                          className="pr-10"
                        />

                        <button
                          type="button"
                          onClick={() => setHidePassword(!hidePassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                          {hidePassword ? (
                            <EyeClosed size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
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
                      Xác nhận mật khẩu
                    </FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          placeholder="Nhập lại mật khẩu"
                          {...field}
                          autoComplete="current-confirm-password"
                          type={hideConfirmPassword ? "password" : "text"}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setHideConfirmPassword(!hideConfirmPassword)
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                          {hideConfirmPassword ? (
                            <EyeClosed size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {!otpMode ? (
            <PrimaryButton
              content="Gửi OTP tới Email"
              handleTodo={handleSendOtp}
            />
          ) : (
            <PrimaryButton content="Đăng ký" type="submit" />
          )}
        </form>
      </Form>
    </div>
  );
};

export default SignUpBlock;
