"use client";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";

import FooterAccount from "./FooterAccount";

const Footer = () => {
  return (
    <footer className="bg-white py-12 px-5">
      <div className="max-w-[1230px] mx-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* Bên trái */}
          <div className="col-span-12 lg:col-span-3 relative pr-6 border-r border-gray-300">
            <Link href="/">
              <Image
                src={"/logo.png"}
                alt="logo"
                width={220}
                height={39}
                className="mb-8"
              />
            </Link>
            <p className="text-sm mb-2">
              Tầng 3, số 4/9A Đường Mậu Thân, Phường Xuân Khánh, Quận Ninh Kiều,
              Thành phố Cần Thơ
            </p>
            <p className="text-sm mb-4">
              <span className="font-bold">Toidocsach</span> nhận đơn hàng trực
              tuyến và giao tận nơi.
            </p>
          </div>

          {/* Bên phải */}
          <div className="col-span-12 lg:col-span-9 lg:pl-12">
            <div className="grid grid-cols-12 gap-6 mb-6">
              {/* Dịch vụ */}
              <div className="col-span-12 md:col-span-4">
                <p className="text-xl font-bold mb-4">DỊCH VỤ</p>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/about-toidocsach"
                      className="hover:text-primary transition-colors"
                    >
                      Giới thiệu về <b>Toidocsach</b>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Hỗ trợ */}
              <div className="col-span-12 md:col-span-4">
                <p className="text-xl font-bold mb-4">CHÍNH SÁCH</p>
                <ul className="space-y-2">
                  <li>
                    <div
                      // href="/nationwide-shipping"
                      className="hover:text-primary transition-colors"
                    >
                      Giao hàng toàn quốc
                    </div>
                  </li>
                  <li>
                    <div
                      // href="/7-day-return"
                      className="hover:text-primary transition-colors"
                    >
                      Đổi trả trong 7 ngày
                    </div>
                  </li>
                  <li>
                    <div
                      // href="/100-percent-refund"
                      className="hover:text-primary transition-colors"
                    >
                      Hoàn tiền 100%
                    </div>
                  </li>
                  {/* <li>
                    <Link
                      href="/payment-methods"
                      className="hover:text-primary transition-colors"
                    >
                      Thanh toán: Tiền mặt, VNPAY & MOMO
                    </Link>
                  </li> */}
                </ul>
              </div>

              {/* Tài khoản */}
              {/* <FooterAccount /> */}
            </div>

            {/* Liên hệ */}
            <div>
              <p className="text-xl font-bold mb-4">LIÊN HỆ</p>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <li className="flex items-center space-x-2">
                  <MapPin />
                  <a
                    href={`https://www.google.com/maps?q=${encodeURIComponent(
                      "Hẻm 4, đường Mậu Thân, phường Ninh Kiều, thành phố Cần Thơ"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-[var(--primary)] transition-colors"
                  >
                    4/9A, Mậu Thân, Ninh Kiều, Cần Thơ
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail />
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=linhb2110130@student.ctu.edu.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-[var(--primary)] transition-colors"
                  >
                    linhb2110130@student.ctu.edu.vn
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone />
                  <a
                    href="tel:+84589443320"
                    className="hover:underline hover:text-[var(--primary)] transition-colors"
                  >
                    (+84) 589443320
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="text-center text-sm">
          <span>© Bản quyền thuộc về </span>
          <span className="font-bold cursor-pointer hover:text-primary">
            Toidocsach
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
