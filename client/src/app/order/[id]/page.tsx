import OrderAddressForm from "@/components/order/OrderAddressForm";
import OrderCheck from "@/components/order/OrderCheck";
import OrderNote from "@/components/order/OrderNote";
import OrderPaymentForm from "@/components/order/OrderPaymentForm";

const OrderPage = () => {
  return (
    <div className="max-w-[1230px] grid grid-cols-[40%_60%] gap-6 mx-auto px-4 py-6 flex">
      <div>
        <OrderAddressForm />
        <OrderPaymentForm />
        <OrderNote />
      </div>
      <div className="relative">
        <div className="sticky top-6">
          <OrderCheck />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
