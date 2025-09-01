"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import CategoriesFilter from "@/components/filter/CategoriesFilter";

export default function ListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="max-w-[1230px] mx-auto px-4 py-6 flex flex-col md:flex-row gap-6 relative">
      {/* Nút toggle mobile */}
      <div className="flex justify-end mb-4 md:hidden">
        <button
          onClick={() => setOpenFilter(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg shadow"
        >
          <Menu size={18} />
          <span>Bộ lọc</span>
        </button>
      </div>

      {/* Sidebar filter */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-42 w-72 bg-white shadow-lg p-4 transform 
          transition-transform duration-300 ease-in-out 
          ${openFilter ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:w-64 md:shrink-0 md:shadow-none
        `}
      >
        {/* Header filter chỉ hiện mobile */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="text-lg font-bold">Lọc sản phẩm</h2>
          <button
            onClick={() => setOpenFilter(false)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter content */}
        <CategoriesFilter />
      </aside>

      {/* Overlay mờ khi mở filter ở mobile */}
      {openFilter && (
        <div
          onClick={() => setOpenFilter(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
