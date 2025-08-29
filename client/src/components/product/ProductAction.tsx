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
import { useCartStore } from "@/store/useCartStore";

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
  const setCart = useCartStore((state) => state.setCart);
  const setCartItems = useCartStore((state) => state.setCartItems);

  const quantityProduct = useQuantityProduct((state) => state.quantityProduct);
  const quantityProductClear = useQuantityProduct((state) => state.clear);
  const setModal = useAuthStore((state) => state.setModal);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddToCart = async (): Promise<void> => {
    if (quantityProduct?.quantity === 0) {
      return showWarning("Hãy thêm ít nhất 1 sản phẩm");
    }

    if ((quantityProduct?.quantity ?? 0) > bookQuantity) {
      return showWarning("Số lượng bạn nhập đã vượt quá số lượng sách hiện có");
    }

    if (!user) {
      showWarning("Hãy đăng nhập để mua hàng");
      return setModal("signin");
    }
    setLoading(true);
    await axiosInstance
      .post(`/cart/${user?.id}/add`, {
        book_id: bookId,
        quantity: quantityProduct?.quantity ? quantityProduct?.quantity : 1,
      })
      .then((res) => {
        const updatedCart = res.data;
        const updatedCartItems = updatedCart.items;

        setCart(updatedCart);
        setCartItems(updatedCartItems);

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
            content="Thêm vào giỏ hàng"
            icon={<ShoppingCart size={18} />}
            handleTodo={handleAddToCart}
          />

          <PrimaryButton content="Mua ngay" />
        </div>
      </div>
    </>
  );
};

export default ProductAction;
