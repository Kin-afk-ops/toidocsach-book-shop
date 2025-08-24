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
          {/* Left */}
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
              3rd Floor, 4/9A Mau Than Street, Xuan Khanh Ward, Ninh Kieu
              District, Can Tho City
            </p>
            <p className="text-sm mb-4">
              <span className="font-bold">Toidocsach</span> accepts online
              orders and delivers to your door.
            </p>
            <div className="flex space-x-5 text-2xl">
              <Facebook className="cursor-pointer" />
              <Youtube className="cursor-pointer" />
              <Twitter className="cursor-pointer" />
            </div>
          </div>

          {/* Right */}
          <div className="col-span-12 lg:col-span-9 lg:pl-12">
            <div className="grid grid-cols-12 gap-6 mb-6">
              {/* Services */}
              <div className="col-span-12 md:col-span-4">
                <p className="text-xl font-bold mb-4">SERVICES</p>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/about-toidocsach"
                      className="hover:text-primary transition-colors"
                    >
                      About <b>Toidocsach</b>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div className="col-span-12 md:col-span-4">
                <p className="text-xl font-bold mb-4">SUPPORT</p>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/nationwide-shipping"
                      className="hover:text-primary transition-colors"
                    >
                      Nationwide Shipping
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/7-day-return"
                      className="hover:text-primary transition-colors"
                    >
                      7-Day Returns
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/100-percent-refund"
                      className="hover:text-primary transition-colors"
                    >
                      100% Refund
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/payment-methods"
                      className="hover:text-primary transition-colors"
                    >
                      Cash, VNPAY & MOMO
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Account */}
              <FooterAccount />
            </div>

            {/* Contact */}
            <div>
              <p className="text-xl font-bold mb-4">CONTACT</p>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <li className="flex items-center space-x-2">
                  <MapPin />
                  <span>4/9A, Mau Than, Ninh Kieu, Can Tho</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail />
                  <span>linhb2110130@student.ctu.edu.vn</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone />
                  <span>(+84) 589443320</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="text-center text-sm">
          <span>© All rights reserved by </span>
          <span className="font-bold cursor-pointer hover:text-primary">
            Toidocsach
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
