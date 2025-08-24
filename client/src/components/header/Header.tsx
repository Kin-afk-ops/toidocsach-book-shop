"use client";
import {
  Bell,
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
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import PrimaryButton from "../customs/PrimaryButton";
import TransparentButton from "../customs/TransparentButton";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AuthBlock from "../auth/AuthBlock";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
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
  const [dialogOpenSignIn, setDialogOpenSignIn] = useState(false);
  const [dialogOpenSignUp, setDialogOpenSignUp] = useState(false);

  const handleSignIn = () => {};

  return (
    <header className="w-full bg-white">
      <div className="mx-auto max-w-[1230px] h-[68px] flex items-center justify-between">
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={220} height={40} priority />
        </Link>

        <div className="w-[calc(100%_-_700px)] flex border border-[#ccc] rounded-[10px] items-center">
          <input
            placeholder="book"
            className="h-[40px] w-[85%] outline-0 border-0 pl-4"
          />
          <Button
            variant="default"
            className="bg-[#e11d48] hover:bg-[#be123c] cursor-pointer w-[15%] "
          >
            <Search />
          </Button>
        </div>

        <div className="flex justify-between w-[340px]">
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
                  onClick={() => router.push("/cart/abc")}
                >
                  <div className="flex flex-col  items-center">
                    <ShoppingCart color="#646464" className="mb-1 " />
                    My Cart
                  </div>
                  <Badge
                    className="h-4 min-w-4 rounded-full px-1 font-mono tabular-nums absolute top-[-5px] right-[-2px]"
                    variant="destructive"
                  >
                    99
                  </Badge>
                </button>
              </HoverCardTrigger>
              <HoverCardContent align="end" className="w-[360px]">
                <div className="flex text-[16px] justify-between">
                  <div className="text-[#0D0E0F] flex items-center font-bold">
                    <ShoppingCart size={16} className="mr-2 font-bold" />
                    <span>{"Giỏ hàng (3)"}</span>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-[#ddd] my-4"></div>

                <div className=" w-full  max-h-[calc(100vh-200px)]  overflow-y-auto">
                  <Link
                    href={"/"}
                    className="flex w-full gap-1 min-w-0  cursor-pointer py-4"
                  >
                    <div className="">
                      <Image
                        src={
                          "https://cdn1.fahasa.com/media/catalog/product//8/9/8935235241015.jpg"
                        }
                        alt="anh chup"
                        width={68}
                        height={68}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="text-[14px] text-[var(--text)] w-[280px] min-w-0 ml-1">
                      <p className=" truncate">
                        Nâng trình ngoại ngữ cùng Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Vero, doloremque tempore
                        qui quam eius enim sint id aliquam, vitae saepe quasi
                        maiores!
                      </p>

                      <div className=" text-justify w-full flex">
                        <p className="mr-2 font-bold">11200</p>
                        <p>x1</p>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="">
                  <PrimaryButton
                    content="Xem giỏ hàng"
                    handleTodo={() => router.push(`/cart/abc`)}
                  />
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>

          <DropdownMenu open={hoverOpen} onOpenChange={setHoverOpen}>
            <DropdownMenuTrigger asChild>
              <div className="text-[12px] flex flex-col cursor-pointer items-center leading-relaxed text-[var(--text)]">
                <User color="#646464" className="mb-1 " />
                My Account
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] px-4 py-2">
              <div className="flex flex-col justify-between  gap-4">
                <Dialog
                  open={dialogOpenSignIn}
                  onOpenChange={(v) => setDialogOpenSignIn(v)}
                >
                  <DialogTrigger asChild>
                    <Button className="flex items-center justify-center w-full gap-2 px-4 py-2 bg-[#e11d48] hover:bg-[#be123c] rounded-lg text-white transition-colors cursor-pointer">
                      <span>Sign In</span>
                    </Button>
                  </DialogTrigger>

                  <AuthBlock
                    mode={true}
                    setDialogOpenSignIn={setDialogOpenSignIn}
                  />
                </Dialog>

                <Dialog
                  open={dialogOpenSignUp}
                  onOpenChange={(v) => setDialogOpenSignUp(v)}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="flex items-center justify-center w-full gap-2 px-4 py-2 border border-[#e11d48] rounded-lg bg-white text-[#e11d48]
           hover:scale-105 hover:bg-white transition-transform duration-300 ease-in-out cursor-pointer"
                    >
                      <span>Sign up</span>
                    </Button>
                  </DialogTrigger>

                  <AuthBlock mode={false} />
                </Dialog>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="text-[var(--text)] text-[14px] w-[100px] flex justify-center items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className=" bg-white cursor-pointer">
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
