"use client";
import PrimaryButton from "@/components/customs/PrimaryButton";
import LoadingScreen from "@/components/loading/LoadingScreen";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Province, Ward } from "@/interface/address.i";
import { CartItemInterface, CartItemWithCheck } from "@/interface/cart.i";
import { getProvinces, getWards } from "@/lib/api/addressApi";
import axiosInstance from "@/lib/api/axiosInstance";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useUserStore";
import { formatPrice } from "@/util/formatPrice ";
import { showError, showSuccess } from "@/util/styles/toast-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const OrderPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const userId = params.id;
  const [loading, setLoading] = useState<boolean>(true);
  const cartItems = useCartStore((state) => state.cartItems);
  const setCartItems = useCartStore((state) => state.setCartItems);
  const setCart = useCartStore((state) => state.setCart);
  const clear = useCartStore((state) => state.clear);
  const user = useAuthStore((state) => state.user);

  const formSchema = z.object({
    fullname: z.string().nonempty({ message: "Họ tên không được để trống." }),
    phone: z
      .string()
      .nonempty({ message: "Số điện thoại không được để trống." })
      .regex(/^[0-9]{10,11}$/, { message: "Số điện thoại không hợp lệ." }),
    country: z.string().nonempty({ message: "Vui lòng chọn quốc gia." }),
    province: z.string(),
    ward: z.string(),
    address: z.string().nonempty({ message: "Địa chỉ không được để trống." }),
    paymentMethod: z
      .string()
      .nonempty({ message: "Vui lòng chọn phương thức thanh toán." }),
    note: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      province: "",
      country: "Việt Nam",
      ward: "",
      address: "",
      paymentMethod: "cod",
      note: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    const formInfo = values;
    const amount = handleGrandTotal();
    const checkedItems = cartItems
      .filter((item) => item.checked)
      .map(({ book_id, quantity }) => ({
        book_id,
        quantity,
      }));
    if (!userId) return;
    setLoading(true);
    await axiosInstance
      .post(`/order/${userId}/checkout`, {
        items: checkedItems,
        receiver: {
          fullname: formInfo.fullname,
          phone: formInfo.phone,
          payment_method: formInfo.paymentMethod,
          note: formInfo.note,
        },
        address: {
          country: formInfo.country,
          province: formInfo.province,
          ward: formInfo.ward,
          address: formInfo.address,
        },
        email: user?.email,
      })
      .then((res) => {
        showSuccess(res?.data.message);
        const cart = res?.data.cart;
        console.log(res.data);

        if (cart) {
          setCart(cart);
          setCartItems(
            res.data.items.map((item: CartItemInterface) => ({
              ...item,
              checked: false,
            }))
          );
        } else {
          clear();
        }
        router.push(`/myOrder/${userId}`);
      })
      .catch((error) => {
        console.log(error);
        const errMsg =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Đã có lỗi từ hệ thống. Mong quý khách thông cảm!";

        showError(errMsg);
      })
      .finally(() => setLoading(false));
  };

  const [cartChecks, setCartChecks] = useState<CartItemWithCheck[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    const fetchProvinces = async (): Promise<void> => {
      const country = form.getValues("country");
      if (country === "Việt Nam") {
        const provinceResponse = await getProvinces(setLoading);
        setProvinces(provinceResponse);
      }
    };
    fetchProvinces();
  }, [form]);

  useEffect(() => {
    const getCartChecks = async (): Promise<void> => {
      const checks = cartItems.filter((item) => item.checked === true);
      setCartChecks(checks);
    };

    getCartChecks();
  }, [cartItems]);

  const handleGrandTotal = () => {
    return cartChecks.reduce((total, item) => {
      if (!item.book) return total;

      const { price, discount } = item?.book;
      const finalPrice =
        price && discount ? price - (price * discount) / 100 : price ?? 0;

      return total + finalPrice * item.quantity;
    }, 0);
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <Form {...form}>
        <form
          className="max-w-[1230px] grid grid-cols-[40%_60%] gap-6 mx-auto px-4 py-6 flex"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div>
            {/* Thông tin giao hàng */}
            <div className="flex w-full justify-center my-4">
              <div className="w-full bg-white p-4">
                <div className="py-4 text-[16px] font-bold uppercase w-full border-b border-[#ccc]">
                  Thông tin giao hàng
                </div>

                <div className="space-y-8 w-full min-w-[300px] mt-4">
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="flex items-center">
                          <FormLabel className="text-[var(--text)] mr-2 w-[30%]">
                            Họ tên người nhận
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập họ tên người nhận"
                              {...field}
                              autoComplete="current-fullname"
                            />
                          </FormControl>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="flex items-center">
                          <FormLabel className="text-[var(--text)] mr-2 w-[30%]">
                            Số điện thoại
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ví dụ: 0979123xxx (10 số)"
                              {...field}
                              autoComplete="current-phone"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="flex items-center">
                          <FormLabel className="text-[var(--text)] mr-2 w-[30%]">
                            Quốc gia
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={async (value) => {
                                field.onChange(value); // update vào react-hook-form

                                if (value === "Việt Nam") {
                                  setLoading(true);
                                  const provinceResponse = await getProvinces(
                                    setLoading
                                  );

                                  setProvinces(provinceResponse);
                                } else {
                                  setProvinces([]); // xóa hết tỉnh/thành
                                  setWards([]);
                                  form.setValue("province", ""); // reset province
                                  form.setValue("ward", ""); // reset ward
                                }
                              }}
                              defaultValue={field.value || "Việt Nam"}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Chọn quốc gia" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Việt Nam">
                                  Việt Nam
                                </SelectItem>
                                <SelectItem value="other">Khác</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => {
                      return (
                        <>
                          {provinces.length > 0 && (
                            <FormItem className="w-full">
                              <div className="flex items-center">
                                <FormLabel className="text-[var(--text)] mr-2 w-[30%]">
                                  Tỉnh/Thành phố
                                </FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={async (value) => {
                                      field.onChange(value);
                                      form.setValue("ward", "");

                                      const selectedProvince = provinces.find(
                                        (p) => p.name === value
                                      );
                                      if (selectedProvince) {
                                        setLoading(true);
                                        const wardResponse = await getWards(
                                          selectedProvince.code,
                                          setLoading
                                        );
                                        setWards(wardResponse);
                                      }
                                    }}
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Chọn tỉnh/thành" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {provinces.map((province) => (
                                        <SelectItem
                                          value={province.name}
                                          key={province.code}
                                        >
                                          {province.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        </>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="ward"
                    render={({ field }) => {
                      return (
                        <>
                          {wards.length > 0 && (
                            <FormItem className="w-full">
                              <div className="flex items-center">
                                <FormLabel className="text-[var(--text)] mr-2 w-[30%]">
                                  Phường/Xã
                                </FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Chọn phường/xã" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {wards.map((ward) => (
                                        <SelectItem
                                          key={ward.code}
                                          value={ward.name}
                                        >
                                          {ward.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        </>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="flex items-center">
                          <FormLabel className="text-[var(--text)] mr-2 w-[30%]">
                            Địa chỉ cụ thể
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập địa chỉ cụ thể"
                              {...field}
                              autoComplete="current-address"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div className="flex w-full justify-center my-4">
              <div className="w-full bg-white p-4">
                <div className="py-4 text-[16px] font-bold uppercase w-full border-b border-[#ccc]">
                  Phương thức thanh toán
                </div>

                <div className="space-y-8 w-full min-w-[300px] mt-4">
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
                                  alt="cod"
                                />
                                Thanh toán khi nhận hàng
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Ghi chú */}
            <div className="flex w-full justify-center my-4">
              <div className="w-full bg-white p-4">
                <div className="py-4 text-[16px] font-bold uppercase w-full border-b border-[#ccc]">
                  Ghi chú
                </div>

                <div className="space-y-8 w-full min-w-[300px] mt-4">
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem className="flex items-center">
                        <FormLabel className="text-[var(--text)] mr-2 w-[30%]">
                          Ghi chú
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Nhập ghi chú"
                            {...field}
                            autoComplete="current-note"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Xác nhận đơn hàng */}
          <div className="relative">
            <div className="sticky top-6">
              <div className="flex w-full justify-center my-4">
                <div className="w-full bg-white p-4">
                  <div className="py-4 text-[16px] font-bold uppercase w-full border-b border-[#ccc]">
                    Kiểm tra đơn hàng
                  </div>

                  <div>
                    <Table>
                      <TableBody>
                        {cartChecks.length > 0 ? (
                          cartChecks.map((cartCheck) => (
                            <TableRow key={cartCheck.id}>
                              <TableCell>
                                <Image
                                  src={
                                    cartCheck.book
                                      ? cartCheck.book.images[0].image_url
                                      : ""
                                  }
                                  alt={
                                    cartCheck.book
                                      ? cartCheck.book?.images[0]
                                          .image_public_id
                                      : "image"
                                  }
                                  width={100}
                                  height={100}
                                  className="object-contain"
                                />
                              </TableCell>
                              <TableCell>
                                <div className="w-[260px] h-[119px] flex flex-col justify-between text-[14px] text-[var(--text)]">
                                  <p className="whitespace-normal break-words line-clamp-2 text-justify w-full">
                                    {cartCheck.book ? cartCheck.book.title : ""}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell className="flex items-center flex-col">
                                <p className="text-[16px] line-[16px]">
                                  {cartCheck.book
                                    ? formatPrice(
                                        cartCheck.book.price -
                                          (cartCheck.book.price *
                                            cartCheck.book.discount) /
                                            100
                                      )
                                    : "0"}
                                </p>
                                <p className="line-through">
                                  {cartCheck.book
                                    ? formatPrice(cartCheck.book.price)
                                    : "0"}
                                </p>
                              </TableCell>
                              <TableCell className="text-center align-top">
                                {cartCheck.quantity}
                              </TableCell>
                              <TableCell className="text-center align-top font-bold text-[var(--primary)]">
                                {cartCheck.book
                                  ? formatPrice(
                                      (cartCheck.book.price -
                                        (cartCheck.book.price *
                                          cartCheck.book.discount) /
                                          100) *
                                        cartCheck.quantity
                                    )
                                  : "0"}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow></TableRow>
                        )}
                      </TableBody>
                    </Table>

                    <div className="flex justify-between mt-4">
                      <div className="flex items-center">
                        <span className="text-[18px] ">Tổng đơn hàng: </span>
                        <span className="ml-2 text-[20px] font-bold text-[var(--primary)]">
                          {formatPrice(handleGrandTotal())}
                        </span>
                      </div>
                      <div className="w-[50%]">
                        <PrimaryButton
                          content="Xác nhận đơn hàng"
                          type="submit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default OrderPage;
