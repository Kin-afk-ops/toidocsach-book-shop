"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Mỗi lần đổi route → cuộn về top
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
