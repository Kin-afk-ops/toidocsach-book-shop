"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const FooterAccount = () => {
  return (
    <div className="col-span-12 md:col-span-4">
      <p className="text-xl font-bold mb-4">MY ACCOUNT</p>
      <ul className="space-y-2">
        <li>
          <Link
            href="/customer/profile"
            className="hover:text-primary transition-colors"
          >
            Edit Profile
          </Link>
        </li>
        <li>
          <Link
            href="/customer/details"
            className="hover:text-primary transition-colors"
          >
            Account Details
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterAccount;
