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
import { useBuyStore } from "@/store/useBuyStore";
import { useRouter } from "next/navigation";

interface ChildProps {
  images: BookImage[];
  bookId: string;
  bookQuantity: number;
  soldCount: number;
}

const ProductAction: React.FC<ChildProps> = ({
  images,
  bookId,
  bookQuantity,
  soldCount,
}) => {
  const user = useAuthStore((state) => state.user);
  const setCart = useCartStore((state) => state.setCart);
  const setCartItems = useCartStore((state) => state.setCartItems);
  const router = useRouter();

  const quantityProduct = useQuantityProduct(
    (state) => state.quantityProduct
  ) ?? {
    quantity: 1,
    bookId: bookId,
  };
  const quantityProductClear = useQuantityProduct((state) => state.clear);
  const setModal = useAuthStore((state) => state.setModal);
  const setBook = useBuyStore((state) => state.setBook);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddToCart = async (): Promise<void> => {
    if (bookQuantity === soldCount) {
      return showWarning("Sản phẩm đã hết hàng! Mong quý khách thông cảm");
    }

    if (quantityProduct?.quantity === 0) {
      return showWarning("Hãy thêm ít nhất 1 sản phẩm");
    }

    if (quantityProduct?.quantity + soldCount > bookQuantity) {
      return showWarning("Số lượng bạn chọn vượt quá số lượng hiện có");
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

  const handleToBuy = () => {
    if (bookQuantity === soldCount) {
      return showWarning("Sản phẩm đã hết hàng! Mong quý khách thông cảm");
    }

    if (quantityProduct?.quantity === 0) {
      return showWarning("Hãy thêm ít nhất 1 sản phẩm");
    }

    if (quantityProduct?.quantity + soldCount > bookQuantity) {
      return showWarning("Số lượng bạn chọn vượt quá số lượng hiện có");
    }

    if (!user) {
      showWarning("Hãy đăng nhập để mua hàng");
      return setModal("signin");
    }

    setBook({
      book_id: bookId,
      quantity: quantityProduct.quantity,
    });
    router.push(`/buyNow/${user?.id}`);
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="list-container flex flex-col items-center p-4">
        <ProductImage images={images} />
        <div className="w-full mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <div className="w-full sm:w-1/2">
            <TransparentButton
              content="Thêm vào giỏ hàng"
              icon={<ShoppingCart size={18} />}
              handleTodo={handleAddToCart}
            />
          </div>

          <div className="w-full sm:w-1/2">
            {" "}
            <PrimaryButton content="Mua ngay" handleTodo={handleToBuy} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductAction;
