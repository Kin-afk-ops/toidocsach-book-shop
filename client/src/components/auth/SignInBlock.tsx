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
import Link from "next/link";
import axiosInstance from "@/lib/api/axiosInstance";
import { showError, showSuccess } from "@/util/styles/toast-utils";
import { useAuthStore } from "@/store/useUserStore";
import { Eye, EyeClosed } from "lucide-react";

interface ChildProps {
  onClose?: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignInBlock: React.FC<ChildProps> = ({ onClose, setLoading }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const formSchema = z.object({
    email: z
      .string()
      .nonempty({ message: "Email không được để trống." })
      .email({ message: "Email không hợp lệ." }),
    password: z
      .string()
      .nonempty({ message: "Mật khẩu không được để trống." })
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    setLoading(true);
    await axiosInstance
      .post("/auth/login", values)
      .then((res) => {
        setUser({
          id: res.data.id,
          email: res.data.email,
        });

        showSuccess("Đăng nhập thành công");
        onClose?.();
      })
      .catch((error) => {
        console.log(error);
        showError("Đăng nhập thất bại, vui lòng thử lại");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col w-full justify-center mt-2">
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
                      type={hidePassword ? "password" : "text"}
                      autoComplete="current-password"
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

          <PrimaryButton content="Đăng nhập" type="submit" />
        </form>
      </Form>

      <Link
        href="/recoveryPassword"
        className="mt-2"
        onClick={() => onClose?.()}
      >
        <span className="text-[14px] hover:text-[var(--primary)] cursor-pointer">
          Quên mật khẩu?
        </span>
      </Link>
    </div>
  );
};

export default SignInBlock;
