import { getMicroCenterOrders } from "@/services/customerService";

const Orders = () => {
  const SPS = async () => {
    window.location.replace(
      "https://auth.spscommerce.com/authorize?audience=api://api.spscommerce.com/&response_type=token&client_id=FLrDHPBYiMS815dB2609EE55ly5vDuzD&redirect_uri=http://apps.gp:5173&state=gp"
    );
  };

  const getOrders = async () => {
    const res = await getMicroCenterOrders("CA/CA584615-1-v7.7-BulkImport.xml");
    console.log(res.data.orders);
  };

  return (
    <div>
      <button className="btn" onClick={SPS}>
        SPS
      </button>

      <button className="btn" onClick={getOrders}>
        Orders
      </button>
    </div>
  );
};

export default Orders;
