import { getMicroCenterOrders } from "@/services/customerService";
import AuthSPS from "@/auth/SPSCommerce";

const Orders = () => {
  // AuthSPS();

  const getOrders = async () => {
    const res = await getMicroCenterOrders("");
    console.log(res.data.orders);
  };

  return (
    <div>
      <button className="btn" onClick={getOrders}>
        Orders
      </button>
    </div>
  );
};

export default Orders;
