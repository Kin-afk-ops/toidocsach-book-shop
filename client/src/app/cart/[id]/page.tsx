"use client";
import CartTable from "@/components/cart/CartTable";
import PrimaryButton from "@/components/customs/PrimaryButton";
import LoadingScreen from "@/components/loading/LoadingScreen";
import { CartItemInterface, CartItemWithCheck } from "@/interface/cart.i";
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

  const [loading, setLoading] = useState<boolean>(true);
  const [cartItemsPage, setCartItemsPage] = useState<CartItemWithCheck[]>([]);

  useEffect(() => {
    const fetchCart = async (): Promise<void> => {
      try {
        // giả lập thời gian loading (cho đẹp UX)
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (cartItems) {
          setCartItemsPage(
            cartItems.map((item: CartItemInterface) => ({
              ...item,
              checked: false,
            }))
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // tắt loading khi xong
      }
    };
    fetchCart();
  }, [cartItems]);

  const handleGrandTotal = () => {
    return cartItemsPage.reduce((total, item) => {
      if (!item.book) return total;

      const { price, discount } = item.book;
      const finalPrice =
        price && discount ? price - (price * discount) / 100 : price ?? 0;

      return total + finalPrice * item.quantity;
    }, 0);
  };

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
          {cartItemsPage.length !== 0 ? (
            <CartTable
              data={cartItemsPage}
              setData={setCartItemsPage}
              setLoading={setLoading}
            />
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
                  {formatPrice(handleGrandTotal())}
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
