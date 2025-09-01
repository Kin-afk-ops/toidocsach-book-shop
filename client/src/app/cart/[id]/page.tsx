"use client";
import CartTable from "@/components/cart/CartTable";
import PrimaryButton from "@/components/customs/PrimaryButton";
import LoadingScreen from "@/components/loading/LoadingScreen";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/util/formatPrice ";
import { showWarning } from "@/util/styles/toast-utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CartPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const userId = params.id;
  const cartItems = useCartStore((state) => state.cartItems);

  const [loading, setLoading] = useState<boolean>(false);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    if (!cartItems) return;

    const total = cartItems.reduce((sum, item) => {
      if (!item.book || !item.checked) return sum;

      const { price, discount } = item.book;
      const finalPrice =
        price && discount ? price - (price * discount) / 100 : price ?? 0;

      return sum + finalPrice * item.quantity;
    }, 0);

    setGrandTotal(total);
  }, [cartItems]);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return showWarning(
        "Giỏ hàng của bạn đang trống. Vui lòng thêm sách trước khi tiến hành thanh toán."
      );
    }

    const checkedItems = cartItems.filter((item) => item.checked);

    if (checkedItems.length === 0) {
      return showWarning(
        "Vui lòng chọn ít nhất một sản phẩm để tiến hành thanh toán."
      );
    }

    router.push(`/order/${userId}`);
  };

  return (
    <>
      {loading && <LoadingScreen />}

      <div className="max-w-[1230px] grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6 mx-auto px-4 py-6">
        <div className="col-span-1">
          {cartItems.length !== 0 ? (
            <CartTable setLoading={setLoading} />
          ) : (
            <div className="list-container flex flex-col items-center justify-center w-full py-6">
              <Image
                src="/no_product_image.png"
                alt="không có sản phẩm"
                width={200}
                height={200}
                className="object-contain"
              />
              <span className="text-[var(--text)] text-[18px]">
                Không có sản phẩm nào
              </span>
            </div>
          )}
        </div>

        <div className="col-span-1">
          <div className="lg:sticky lg:top-6">
            <div className="list-container p-4">
              <div className="flex justify-between items-center pb-6">
                <p className="text-[16px] font-bold">Tổng cộng</p>
                <p className="text-2xl text-[var(--primary)] font-bold">
                  {formatPrice(grandTotal)}
                </p>
              </div>

              <PrimaryButton
                content="Tiến hành thanh toán"
                handleTodo={() => {
                  handleCheckout();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
