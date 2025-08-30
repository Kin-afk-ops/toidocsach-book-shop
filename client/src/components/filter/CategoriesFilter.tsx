"use client";
import { CategoryInterface } from "@/interface/category.i";
import CategoriesFilterDetail from "./CategoriesFilterDetail";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/api/axiosInstance";

const CategoriesFilter = () => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        setCategories(res?.data);
      } catch (error) {
        console.error("Fetch categories failed:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full md:w-64 flex-shrink-0">
      {/* Danh mục */}
      <div className="mb-4">
        <p className="font-semibold mb-2">Danh mục</p>
        <ul className="space-y-1 pl-3">
          <CategoriesFilterDetail categories={categories} />
        </ul>
      </div>
    </div>
  );
};

export default CategoriesFilter;
