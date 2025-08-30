"use client";
import {
  Bell,
  BookA,
  ChartBarBig,
  NotebookPen,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import PrimaryButton from "../customs/PrimaryButton";
import TransparentButton from "../customs/TransparentButton";

import { Dialog, DialogTrigger } from "../ui/dialog";
import AuthBlock from "../auth/AuthBlock";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useUserStore";
import axiosInstance from "@/lib/api/axiosInstance";
import { showError, showSuccess } from "@/util/styles/toast-utils";
import LoadingScreen from "../loading/LoadingScreen";
import { useCartStore } from "@/store/useCartStore";
import formatSlug from "@/util/formatSlug";
import { formatPrice } from "@/util/formatPrice ";
import { CartItemInterface } from "@/interface/cart.i";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const cartItems = useCartStore((state) => state.cartItems);
  const setCartItems = useCartStore((state) => state.setCartItems);

  const setCart = useCartStore((state) => state.setCart);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clear);

  const modalType = useAuthStore((state) => state.modalType);
  const setModal = useAuthStore((state) => state.setModal);
  const closeModal = useAuthStore((state) => state.closeModal);

  const [loading, setLoading] = useState<boolean>(true);
  const [language, setLanguage] = useState<{
    label: string;
    value: string;
    logo: string;
  }>({
    label: "English",
    value: "Eng",
    logo: "/us_uk_logo.jpg",
  });

  const languages = [
    {
      label: "Tiếng Việt",
      value: "Vi",
      logo: "/vn_logo.jpg",
    },

    {
      label: "English",
      value: "Eng",
      logo: "/us_uk_logo.jpg",
    },
  ];

  const [hoverOpen, setHoverOpen] = useState(false);

  const handleLogout = async (): Promise<void> => {
    setLoading(true);
    await axiosInstance
      .post("/auth/logout")
      .then(() => {
        logout();
        clearCart();
        router.push("/");
        showSuccess("Đã đăng xuất tài khoản");
      })
      .catch((error) => {
        console.log(error);
        showError("Đã có lỗi từ hệ thống! Mong quý khách hàng thông cảm");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const fetchCart = async (): Promise<void> => {
      try {
        if (user) {
          await new Promise((resolve) => setTimeout(resolve, 800));

          const res = await axiosInstance.get(`/cart/${user.id}`);
          if (!cart) {
            setCart(res.data);
          }

          if (cartItems.length === 0) {
            setCartItems(
              res.data.items.map((item: CartItemInterface) => ({
                ...item,
                checked: false,
              }))
            );
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      {loading && <LoadingScreen />}
      <header className="w-full bg-white">
        <div className="mx-auto max-w-[1230px] h-[68px] flex items-center justify-between">
          <Link href={"/"} className="shrink-0">
            <Image
              src="/logo.png"
              alt="logo"
              width={180}
              height={40}
              priority
              className="w-[120px] sm:w-[160px] md:w-[180px] lg:w-[220px]"
            />
          </Link>

          <div className="hidden md:flex flex-1 px-4">
            <HeaderSearch />
          </div>

          <div className="flex items-center gap-4 sm:gap-6 md:gap-10 text-xs sm:text-sm">
            {/* <HoverCard openDelay={100} closeDelay={100}>
              <HoverCardTrigger>
                <div className="text-[12px]  cursor-pointer leading-relaxed text-[var(--text)] relative">
                  <div className="flex flex-col  items-center">
                    <Bell color="#646464" className="mb-1 " />
                    Notification
                  </div>
                  <Badge
                    className="h-4 min-w-4 rounded-full px-1 font-mono tabular-nums absolute top-[-5px] right-[5px]"
                    variant="destructive"
                  >
                    99
                  </Badge>
                </div>
              </HoverCardTrigger>
              <HoverCardContent align="end" className="w-[360px]">
                <div className="flex text-[16px] justify-between">
                  <div className="text-[#0D0E0F] flex items-center font-bold">
                    <Bell size={16} className="mr-2 font-bold" />
                    <span>{"Thông báo (27)"}</span>
                  </div>
                  <Link href={"/"} className="text-[#2489F4] font-bold">
                    Xem tất cả
                  </Link>
                </div>
                <div className="w-full h-[1px] bg-[#ddd] my-4"></div>
  
                <div className=" w-full  max-h-[calc(100vh-200px)]  overflow-y-auto">
                  <Link
                    href={"/"}
                    className="flex w-full gap-1 min-w-0  cursor-pointer py-4"
                  >
                    <div className="">
                      <NotebookPen />
                    </div>
                    <div className="text-[14px] text-[var(--text)] w-[280px] min-w-0">
                      <p className="font-bold truncate">
                        Nâng trình ngoại ngữ cùng Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Vero, doloremque tempore qui
                        quam eius enim sint id aliquam, vitae saepe quasi maiores!
                      </p>
  
                      <p className="line-clamp-2 text-justify w-full">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusamus perferendis a assumenda autem facere veritatis
                        nesciunt, asperiores ratione earum optio vel. Consequuntur
                        deserunt quo voluptas facilis modi corrupti officia
                        explicabo?
                      </p>
                    </div>
                  </Link>
  
                  <Link
                    href={"/"}
                    className="flex w-full gap-1 min-w-0  cursor-pointer py-4"
                  >
                    <div className="">
                      <NotebookPen />
                    </div>
                    <div className="text-[14px] text-[var(--text)] w-[280px] min-w-0">
                      <p className="font-bold truncate">
                        Nâng trình ngoại ngữ cùng Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Vero, doloremque tempore qui
                        quam eius enim sint id aliquam, vitae saepe quasi maiores!
                      </p>
  
                      <p className="line-clamp-2 text-justify w-full">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusamus perferendis a assumenda autem facere veritatis
                        nesciunt, asperiores ratione earum optio vel. Consequuntur
                        deserunt quo voluptas facilis modi corrupti officia
                        explicabo?
                      </p>
                    </div>
                  </Link>
  
                  <Link
                    href={"/"}
                    className="flex w-full gap-1 min-w-0  cursor-pointer py-4"
                  >
                    <div className="">
                      <NotebookPen />
                    </div>
                    <div className="text-[14px] text-[var(--text)] w-[280px] min-w-0">
                      <p className="font-bold truncate">
                        Nâng trình ngoại ngữ cùng Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Vero, doloremque tempore qui
                        quam eius enim sint id aliquam, vitae saepe quasi maiores!
                      </p>
  
                      <p className="line-clamp-2 text-justify w-full">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusamus perferendis a assumenda autem facere veritatis
                        nesciunt, asperiores ratione earum optio vel. Consequuntur
                        deserunt quo voluptas facilis modi corrupti officia
                        explicabo?
                      </p>
                    </div>
                  </Link>
  
                  <Link
                    href={"/"}
                    className="flex w-full gap-1 min-w-0  cursor-pointer py-4"
                  >
                    <div className="">
                      <NotebookPen />
                    </div>
                    <div className="text-[14px] text-[var(--text)] w-[280px] min-w-0">
                      <p className="font-bold truncate">
                        Nâng trình ngoại ngữ cùng Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Vero, doloremque tempore qui
                        quam eius enim sint id aliquam, vitae saepe quasi maiores!
                      </p>
  
                      <p className="line-clamp-2 text-justify w-full">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusamus perferendis a assumenda autem facere veritatis
                        nesciunt, asperiores ratione earum optio vel. Consequuntur
                        deserunt quo voluptas facilis modi corrupti officia
                        explicabo?
                      </p>
                    </div>
                  </Link>
  
                  <Link
                    href={"/"}
                    className="flex w-full gap-1 min-w-0  cursor-pointer py-4"
                  >
                    <div className="">
                      <NotebookPen />
                    </div>
                    <div className="text-[14px] text-[var(--text)] w-[280px] min-w-0">
                      <p className="font-bold truncate">
                        Nâng trình ngoại ngữ cùng Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Vero, doloremque tempore qui
                        quam eius enim sint id aliquam, vitae saepe quasi maiores!
                      </p>
  
                      <p className="line-clamp-2 text-justify w-full">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusamus perferendis a assumenda autem facere veritatis
                        nesciunt, asperiores ratione earum optio vel. Consequuntur
                        deserunt quo voluptas facilis modi corrupti officia
                        explicabo?
                      </p>
                    </div>
                  </Link>
  
                  <Link
                    href={"/"}
                    className="flex w-full gap-1 min-w-0  cursor-pointer py-4"
                  >
                    <div className="">
                      <NotebookPen />
                    </div>
                    <div className="text-[14px] text-[var(--text)] w-[280px] min-w-0">
                      <p className="font-bold truncate">
                        Nâng trình ngoại ngữ cùng Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Vero, doloremque tempore qui
                        quam eius enim sint id aliquam, vitae saepe quasi maiores!
                      </p>
  
                      <p className="line-clamp-2 text-justify w-full">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusamus perferendis a assumenda autem facere veritatis
                        nesciunt, asperiores ratione earum optio vel. Consequuntur
                        deserunt quo voluptas facilis modi corrupti officia
                        explicabo?
                      </p>
                    </div>
                  </Link>
  
                  <Link
                    href={"/"}
                    className="flex w-full gap-1 min-w-0  cursor-pointer py-4"
                  >
                    <div className="">
                      <NotebookPen />
                    </div>
                    <div className="text-[14px] text-[var(--text)] w-[280px] min-w-0">
                      <p className="font-bold truncate">
                        Nâng trình ngoại ngữ cùng Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Vero, doloremque tempore qui
                        quam eius enim sint id aliquam, vitae saepe quasi maiores!
                      </p>
  
                      <p className="line-clamp-2 text-justify w-full">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusamus perferendis a assumenda autem facere veritatis
                        nesciunt, asperiores ratione earum optio vel. Consequuntur
                        deserunt quo voluptas facilis modi corrupti officia
                        explicabo?
                      </p>
                    </div>
                  </Link>
  
                  <Link
                    href={"/"}
                    className="flex w-full gap-1 min-w-0  cursor-pointer py-4"
                  >
                    <div className="">
                      <NotebookPen />
                    </div>
                    <div className="text-[14px] text-[var(--text)] w-[280px] min-w-0">
                      <p className="font-bold truncate">
                        Nâng trình ngoại ngữ cùng Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Vero, doloremque tempore qui
                        quam eius enim sint id aliquam, vitae saepe quasi maiores!
                      </p>
  
                      <p className="line-clamp-2 text-justify w-full">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusamus perferendis a assumenda autem facere veritatis
                        nesciunt, asperiores ratione earum optio vel. Consequuntur
                        deserunt quo voluptas facilis modi corrupti officia
                        explicabo?
                      </p>
                    </div>
                  </Link>
  
                  <Link
                    href={"/"}
                    className="flex w-full gap-1 min-w-0  cursor-pointer py-4"
                  >
                    <div className="">
                      <NotebookPen />
                    </div>
                    <div className="text-[14px] text-[var(--text)] w-[280px] min-w-0">
                      <p className="font-bold truncate">
                        Nâng trình ngoại ngữ cùng Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Vero, doloremque tempore qui
                        quam eius enim sint id aliquam, vitae saepe quasi maiores!
                      </p>
  
                      <p className="line-clamp-2 text-justify w-full">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusamus perferendis a assumenda autem facere veritatis
                        nesciunt, asperiores ratione earum optio vel. Consequuntur
                        deserunt quo voluptas facilis modi corrupti officia
                        explicabo?
                      </p>
                    </div>
                  </Link>
  
                  <Link
                    href={"/"}
                    className="flex w-full gap-1 min-w-0  cursor-pointer py-4"
                  >
                    <div className="">
                      <NotebookPen />
                    </div>
                    <div className="text-[14px] text-[var(--text)] w-[280px] min-w-0">
                      <p className="font-bold truncate">
                        Nâng trình ngoại ngữ cùng Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Vero, doloremque tempore qui
                        quam eius enim sint id aliquam, vitae saepe quasi maiores!
                      </p>
  
                      <p className="line-clamp-2 text-justify w-full">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusamus perferendis a assumenda autem facere veritatis
                        nesciunt, asperiores ratione earum optio vel. Consequuntur
                        deserunt quo voluptas facilis modi corrupti officia
                        explicabo?
                      </p>
                    </div>
                  </Link>
  
                  <Link
                    href={"/"}
                    className="flex w-full gap-1 min-w-0  cursor-pointer py-4"
                  >
                    <div className="">
                      <NotebookPen />
                    </div>
                    <div className="text-[14px] text-[var(--text)] w-[280px] min-w-0">
                      <p className="font-bold truncate">
                        Nâng trình ngoại ngữ cùng Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Vero, doloremque tempore qui
                        quam eius enim sint id aliquam, vitae saepe quasi maiores!
                      </p>
  
                      <p className="line-clamp-2 text-justify w-full">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusamus perferendis a assumenda autem facere veritatis
                        nesciunt, asperiores ratione earum optio vel. Consequuntur
                        deserunt quo voluptas facilis modi corrupti officia
                        explicabo?
                      </p>
                    </div>
                  </Link>
  
                  <Link
                    href={"/"}
                    className="flex w-full gap-1 min-w-0  cursor-pointer py-4"
                  >
                    <div className="">
                      <NotebookPen />
                    </div>
                    <div className="text-[14px] text-[var(--text)] w-[280px] min-w-0">
                      <p className="font-bold truncate">
                        Nâng trình ngoại ngữ cùng Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Vero, doloremque tempore qui
                        quam eius enim sint id aliquam, vitae saepe quasi maiores!
                      </p>
  
                      <p className="line-clamp-2 text-justify w-full">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusamus perferendis a assumenda autem facere veritatis
                        nesciunt, asperiores ratione earum optio vel. Consequuntur
                        deserunt quo voluptas facilis modi corrupti officia
                        explicabo?
                      </p>
                    </div>
                  </Link>
                </div>
              </HoverCardContent>
            </HoverCard> */}

            <div className="text-[12px] flex flex-col cursor-pointer items-center leading-relaxed text-[var(--text)]">
              <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger>
                  <button
                    className="text-[12px]  cursor-pointer leading-relaxed text-[var(--text)] relative"
                    onClick={() => {
                      if (user) {
                        router.push(`/cart/${user?.id}`);
                      }
                    }}
                  >
                    <div className="flex flex-col  items-center">
                      <ShoppingCart color="#646464" className="mb-1 " />
                      Giỏ hàng
                    </div>
                    {cartItems.length > 0 && (
                      <Badge
                        className="h-4 min-w-4 rounded-full px-1 font-mono tabular-nums absolute top-[-5px] right-[-2px]"
                        variant="destructive"
                      >
                        {cartItems.length}
                      </Badge>
                    )}
                  </button>
                </HoverCardTrigger>
                <HoverCardContent
                  align="end"
                  className="w-[360px] hidden md:block"
                >
                  <div className="flex text-[16px] justify-between">
                    <div className="text-[#0D0E0F] flex items-center font-bold">
                      <ShoppingCart size={16} className="mr-2 font-bold" />
                      <span>{`Giỏ hàng (${
                        cartItems ? cartItems.length : "0"
                      })`}</span>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-[#ddd] my-4"></div>

                  <div className=" w-full  max-h-[calc(100vh-200px)]  overflow-y-auto">
                    {cartItems.length > 0 ? (
                      cartItems.map((cartItem) => (
                        <Link
                          key={cartItem.id}
                          href={`/product/${formatSlug(
                            cartItem.book ? cartItem.book?.title : ""
                          )}.html?q=${cartItem.book ? cartItem.book?.id : ""}`}
                          className="flex w-full gap-1 min-w-0  cursor-pointer py-4"
                        >
                          <div className="">
                            <Image
                              src={
                                cartItem.book
                                  ? cartItem.book.images[0].image_url
                                  : ""
                              }
                              alt=""
                              width={68}
                              height={68}
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div className="text-[14px] text-[var(--text)] w-[280px] min-w-0 ml-1">
                            <p className=" truncate">
                              {cartItem.book ? cartItem.book.title : ""}
                            </p>

                            <div className=" text-justify w-full flex">
                              <p className="mr-2 font-bold">
                                {cartItem.book
                                  ? formatPrice(
                                      cartItem.book.price -
                                        (cartItem.book.price *
                                          cartItem.book.discount) /
                                          100
                                    )
                                  : "0"}
                              </p>
                              <p>x{cartItem.quantity && cartItem.quantity}</p>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="w-full flex justify-center text-[var(--text)] pb-6">
                        Không có sản phẩm
                      </div>
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div className="">
                      <PrimaryButton
                        content="Xem giỏ hàng"
                        handleTodo={() => {
                          if (user) {
                            router.push(`/cart/${user?.id}`);
                          }
                        }}
                      />
                    </div>
                  )}
                </HoverCardContent>
              </HoverCard>
            </div>

            {user && (
              <div className="text-[12px] flex flex-col cursor-pointer items-center leading-relaxed text-[var(--text)]">
                <button
                  className="text-[12px]  cursor-pointer leading-relaxed text-[var(--text)] relative"
                  onClick={() => {
                    if (user) {
                      router.push(`/myOrder/${user?.id}`);
                    }
                  }}
                >
                  <div className="flex flex-col  items-center">
                    <BookA color="#646464" className="mb-1 " />
                    Đơn hàng
                  </div>
                </button>
              </div>
            )}

            <DropdownMenu
              open={hoverOpen}
              onOpenChange={setHoverOpen}
              modal={false}
            >
              <DropdownMenuTrigger asChild>
                <div className="text-[12px] flex flex-col cursor-pointer items-center leading-relaxed text-[var(--text)]">
                  <User color="#646464" className="mb-1 " />
                  Tài khoản
                </div>
              </DropdownMenuTrigger>

              {user ? (
                <DropdownMenuContent className="w-[200px] px-4 py-2">
                  <div className="flex flex-col justify-between  gap-4">
                    <Button
                      onClick={handleLogout}
                      className="flex items-center justify-center w-full gap-2 px-4 py-2 border border-[var(--text)] rounded-lg bg-white text-[var(--text)]
             hover:scale-105 hover:bg-white transition-transform duration-300 ease-in-out cursor-pointer"
                    >
                      <span>Đăng xuất</span>
                    </Button>
                  </div>
                </DropdownMenuContent>
              ) : (
                <DropdownMenuContent className="w-[200px] px-4 py-2">
                  <div className="flex flex-col justify-between  gap-4">
                    <Button
                      className="flex items-center justify-center w-full gap-2 px-4 py-2 bg-[#e11d48] hover:bg-[#be123c] rounded-lg text-white transition-colors cursor-pointer"
                      onClick={() => setModal("signin")}
                    >
                      <span>Đăng nhập</span>
                    </Button>
                    <Button
                      onClick={() => setModal("signup")}
                      className="flex items-center justify-center w-full gap-2 px-4 py-2 border border-[#e11d48] rounded-lg bg-white text-[#e11d48]
             hover:scale-105 hover:bg-white transition-transform duration-300 ease-in-out cursor-pointer"
                    >
                      <span>Đăng ký</span>
                    </Button>
                  </div>
                </DropdownMenuContent>
              )}
            </DropdownMenu>

            {/* <div className="text-[var(--text)] text-[14px] w-[100px] flex justify-center items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className=" bg-white cursor-pointer"
                  >
                    <Image
                      src={language.logo}
                      alt={language.label}
                      width={20}
                      height={14}
                      className="rounded-sm"
                      style={{ objectFit: "contain" }}
                    />
                    <span> {language.label}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {languages.map((lang, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => {
                        setLanguage(lang);
                      }}
                      className="cursor-pointer"
                    >
                      <Image
                        src={lang.logo}
                        alt={lang.label}
                        width={20}
                        height={14}
                        className="rounded-sm"
                        style={{ objectFit: "contain" }}
                      />
                      <span> {lang.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div> */}
          </div>
        </div>
      </header>

      <div className="flex md:hidden px-4 pb-2">
        <HeaderSearch />
      </div>

      <Dialog
        open={modalType === "signin"}
        onOpenChange={(v) => (v ? setModal("signin") : closeModal())}
      >
        <AuthBlock mode={true} />
      </Dialog>

      <Dialog
        open={modalType === "signup"}
        onOpenChange={(v) => (v ? setModal("signup") : closeModal())}
      >
        <AuthBlock mode={false} />
      </Dialog>
    </>
  );
};

export default Header;
