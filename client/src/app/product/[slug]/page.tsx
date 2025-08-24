import ProductAction from "@/components/product/ProductAction";
import ProductDescription from "@/components/product/productInfo/ProductDescription";
import ProductInfo from "@/components/product/productInfo/ProductInfo";
import ProductInfoDetail from "@/components/product/productInfo/ProductInfoDetail";
import React from "react";

const ProductPage = () => {
  return (
    <div className="max-w-[1230px] grid grid-cols-[40%_60%] gap-6 mx-auto px-4 py-6 flex">
      <div className="relative">
        <div className="sticky top-6">
          <ProductAction />
        </div>
      </div>

      <div>
        <ProductInfo />
        <ProductInfoDetail />
        <ProductDescription />
      </div>
    </div>
  );
};

export default ProductPage;
