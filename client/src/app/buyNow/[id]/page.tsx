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
import { BookItemInterface } from "@/interface/book.i";
import { CartItemInterface, CartItemWithCheck } from "@/interface/cart.i";
import { getProvinces, getWards } from "@/lib/api/addressApi";
import axiosInstance from "@/lib/api/axiosInstance";
import { useBuyStore } from "@/store/useBuyStore";
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

const BuyNowPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const userId = params.id;
  const [loading, setLoading] = useState<boolean>(true);
  const book = useBuyStore((state) => state.book);
  const clear = useBuyStore((state) => state.clear);
  const user = useAuthStore((state) => state.user);
  const [bookItems, setBookItems] = useState<BookItemInterface | null>(null);

  useEffect(() => {
    const fetchBookItems = async () => {
      try {
        const res = await axiosInstance.get(`/bookItems/${book?.book_id}`);
        setBookItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (book) {
      fetchBookItems();
    }
  }, [book]);

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

    if (!userId) return;
    setLoading(true);
    await axiosInstance
      .post(`/order/${userId}/checkout_no_cart`, {
        items: book,
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
        clear();
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

  return (
    <>
      {loading && <LoadingScreen />}
      <Form {...form}>
        <form
          className="
    max-w-[1230px] 
    mx-auto px-4 py-6 
    grid gap-6 
    grid-cols-1 
    lg:grid-cols-[40%_60%]
  "
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
                        <div className="flex flex-col lg:flex-row lg:items-center">
                          <FormLabel className="text-[var(--text)] mb-2 lg:mb-0 lg:mr-2 lg:w-[30%]">
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
                        <div className="flex flex-col lg:flex-row lg:items-center">
                          <FormLabel className="text-[var(--text)] mb-2 lg:mb-0 lg:mr-2 lg:w-[30%]">
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
                        <div className="flex flex-col lg:flex-row lg:items-center">
                          <FormLabel className="text-[var(--text)] mb-2 lg:mb-0 lg:mr-2 lg:w-[30%]">
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
                              <div className="flex flex-col lg:flex-row lg:items-center">
                                <FormLabel className="text-[var(--text)] mb-2 lg:mb-0 lg:mr-2 lg:w-[30%]">
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
                              <div className="flex flex-col lg:flex-row lg:items-center">
                                <FormLabel className="text-[var(--text)] mb-2 lg:mb-0 lg:mr-2 lg:w-[30%]">
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
                        <div className="flex flex-col lg:flex-row lg:items-center">
                          <FormLabel className="text-[var(--text)] mb-2 lg:mb-0 lg:mr-2 lg:w-[30%]">
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
                      <FormItem className="flex flex-col lg:flex-row lg:items-center">
                        <FormLabel className="text-[var(--text)] mb-2 lg:mb-0 lg:mr-2 lg:w-[30%]">
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
                <div className="w-full bg-white p-4 rounded-lg shadow">
                  <div className="py-4 text-[16px] font-bold uppercase w-full border-b border-[#ccc]">
                    Kiểm tra đơn hàng
                  </div>

                  <div className="hidden md:block">
                    <Table>
                      <TableBody>
                        {bookItems ? (
                          <TableRow>
                            <TableCell>
                              <Image
                                src={
                                  bookItems.images
                                    ? bookItems.images[0].image_url
                                    : ""
                                }
                                alt={
                                  bookItems.images
                                    ? bookItems.images[0].image_public_id
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
                                  {bookItems.title}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="flex items-center flex-col">
                              <p className="text-[16px] line-[16px]">
                                {formatPrice(
                                  bookItems.price -
                                    (bookItems.price * bookItems.discount) / 100
                                )}
                              </p>
                              <p className="line-through">
                                {formatPrice(bookItems.price)}
                              </p>
                            </TableCell>
                            <TableCell className="text-center align-top">
                              {book && book.quantity}
                            </TableCell>
                            <TableCell className="text-center align-top font-bold text-[var(--primary)]">
                              {book?.quantity &&
                                formatPrice(
                                  (bookItems.price -
                                    (bookItems.price * bookItems.discount) /
                                      100) *
                                    book.quantity
                                )}
                            </TableCell>
                          </TableRow>
                        ) : (
                          <TableRow></TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="space-y-4 md:hidden mt-4">
                    {bookItems && (
                      <div className="flex gap-4 p-4 border rounded-lg shadow-sm">
                        <Image
                          src={bookItems ? bookItems.images[0].image_url : ""}
                          alt={bookItems ? bookItems.title : "Sách"}
                          width={80}
                          height={80}
                          className="object-contain w-[80px] h-[80px]"
                        />

                        <div className="flex flex-col justify-between flex-1 text-sm">
                          {/* Tên sách */}
                          <p className="font-medium line-clamp-2 text-[14px]">
                            {bookItems.title}
                          </p>

                          {/* Giá */}
                          <div className="flex items-center gap-2">
                            <p className="text-red-600 font-bold">
                              {bookItems
                                ? formatPrice(
                                    bookItems.price -
                                      (bookItems.price * bookItems.discount) /
                                        100
                                  )
                                : "0"}
                            </p>
                            <p className="text-gray-400 line-through text-xs">
                              {formatPrice(bookItems?.price ?? 0)}
                            </p>
                          </div>

                          {/* SL + Tổng */}
                          <div className="flex justify-between items-center mt-1">
                            <span>Số lượng: {book && book.quantity}</span>
                            <span className="font-bold text-[var(--primary)]">
                              {book && bookItems
                                ? formatPrice(
                                    (bookItems.price -
                                      (bookItems.price * bookItems.discount) /
                                        100) *
                                      book.quantity
                                  )
                                : "0"}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
                    <div className="flex items-center">
                      <span className="text-[16px] md:text-[18px]">
                        Tổng đơn hàng:{" "}
                      </span>
                      <span className="ml-2 text-[18px] md:text-[20px] font-bold text-[var(--primary)]">
                        {book && bookItems
                          ? formatPrice(
                              (bookItems.price -
                                (bookItems.price * bookItems.discount) / 100) *
                                book.quantity
                            )
                          : "0"}
                      </span>
                    </div>
                    <div className="w-full md:w-[50%]">
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
        </form>
      </Form>
    </>
  );
};

export default BuyNowPage;
