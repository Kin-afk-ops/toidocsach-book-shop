"use client";
import CartTable from "@/components/cart/CartTable";
import PrimaryButton from "@/components/customs/PrimaryButton";
import LoadingScreen from "@/components/loading/LoadingScreen";
import { CartInterface, CartItemInterface } from "@/interface/cart.i";
import axiosInstance from "@/lib/api/axiosInstance";
import { useAuthStore } from "@/store/useUserStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CartPage = () => {
  const params = useParams<{ id: string }>();

  const router = useRouter();
  const userId = params.id;
  const [cart, setCart] = useState<CartInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemInterface[]>([]);

  useEffect(() => {
    const fetchCart = async (): Promise<void> => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/cart/${userId}`);
        setCart(res.data);
        setCartItems(res.data.items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [userId]);

  console.log(cartItems);

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="max-w-[1230px] grid grid-cols-[70%_30%] gap-6 mx-auto px-4 py-6 flex">
        <div>
          {cart && (
            <CartTable
              data={cartItems}
              setData={setCartItems}
              setLoading={setLoading}
            />
          )}
        </div>
        <div className="relative">
          <div className="sticky top-6">
            <div className="list-container p-4">
              <div className="flex justify-between items-center pb-6">
                <p className="text-[16px] font-bold">Grand Total</p>
                <p className="text-2xl text-[var(--primary)] font-bold">0 đ</p>
              </div>

              <PrimaryButton
                content="Proceed to Checkout"
                handleTodo={() => router.push("/order/abc")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
