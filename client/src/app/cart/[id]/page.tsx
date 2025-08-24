"use client";
import CartTable from "@/components/cart/CartTable";
import PrimaryButton from "@/components/customs/PrimaryButton";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const router = useRouter();

  return (
    <div className="max-w-[1230px] grid grid-cols-[70%_30%] gap-6 mx-auto px-4 py-6 flex">
      <div>
        <CartTable />
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
  );
};

export default CartPage;
