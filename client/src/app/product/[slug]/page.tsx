import ProductAction from "@/components/product/ProductAction";
import ProductDescription from "@/components/product/productInfo/ProductDescription";
import ProductInfo from "@/components/product/productInfo/ProductInfo";
import ProductInfoDetail from "@/components/product/productInfo/ProductInfoDetail";
import { BookInterface } from "@/interface/book.i";
import React from "react";

interface ProductPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { slug: string };
}
const ProductPage = async ({ params, searchParams }: ProductPageProps) => {
  const query = await searchParams;
  const bookId = query.q as string;

  const bookResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/book/${bookId}`
  );
  const bookData: BookInterface | null = await bookResponse.json();

  return (
    <div className="max-w-[1230px] grid grid-cols-[40%_60%] gap-6 mx-auto px-4 py-6 flex">
      <div className="relative">
        <div className="sticky top-6">
          {bookData && (
            <ProductAction
              images={bookData.images}
              bookId={bookId}
              bookQuantity={bookData.quantity}
            />
          )}
        </div>
      </div>

      <div>
        {bookData && (
          <ProductInfo
            title={bookData.title}
            supplier={bookData?.detail.publisher}
            author={bookData.detail.author}
            publisher={bookData.detail.publisher}
            layout={bookData.detail.layout}
            sold_count={bookData.sold_count}
            bookQuantity={bookData.quantity}
            price={bookData.price}
            discount={bookData.discount}
            bookId={bookId}
          />
        )}
        <ProductInfoDetail bookDetail={bookData?.detail} bookId={bookId} />
        <ProductDescription description={bookData?.detail.description} />
      </div>
    </div>
  );
};

export default ProductPage;
