"use client";
import ProductImage from "./ProductImage";
import TransparentButton from "../customs/TransparentButton";
import { ShoppingCart } from "lucide-react";
import PrimaryButton from "../customs/PrimaryButton";
import { BookImage } from "@/interface/book.i";
import { useAuthStore } from "@/store/useUserStore";
import { useQuantityProduct } from "@/store/useQuanityProductStore";
import axiosInstance from "@/lib/api/axiosInstance";
import { showError, showSuccess, showWarning } from "@/util/styles/toast-utils";
import { useState } from "react";
import LoadingScreen from "../loading/LoadingScreen";

interface ChildProps {
  images: BookImage[];
  bookId: string;
  bookQuantity: number;
}

const ProductAction: React.FC<ChildProps> = ({
  images,
  bookId,
  bookQuantity,
}) => {
  const user = useAuthStore((state) => state.user);
  const quantityProduct = useQuantityProduct((state) => state.quantityProduct);
  const quantityProductClear = useQuantityProduct((state) => state.clear);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddToCart = async (): Promise<void> => {
    if (quantityProduct?.quantity === 0) {
      return showWarning("Hãy thêm ít nhất 1 sản phẩm");
    }

    if ((quantityProduct?.quantity ?? 0) > bookQuantity) {
      return showWarning("Số lượng bạn nhập đã vượt quá số lượng sách hiện có");
    }
    setLoading(true);
    await axiosInstance
      .post(`/cart/${user?.id}/add`, {
        book_id: bookId,
        quantity: quantityProduct?.quantity ? quantityProduct?.quantity : 1,
      })
      .then((res) => {
        console.log(res.data);
        showSuccess("Đã thêm sách vào giỏ hàng");
        quantityProductClear();
      })
      .catch((error) => {
        console.log(error);
        const errMsg =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Thêm sách vào giỏ hàng thất bại! Hệ thống đang lỗi sẽ sớm khắc phục. Mong khách hàng thông cảm";

        showError(errMsg);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      {loading && <LoadingScreen />}
      <div className="list-container flex flex-col items-center p-4">
        <ProductImage images={images} />
        <div className="flex justify-between w-full mt-6 grid grid-cols-2 gap-4">
          <TransparentButton
            content="Add to Cart"
            icon={<ShoppingCart size={18} />}
            handleTodo={handleAddToCart}
          />

          <PrimaryButton content="Buy now" />
        </div>
      </div>
    </>
  );
};

export default ProductAction;
