import React, { useState, useEffect } from "react";
import { MapPin, Calendar, ShoppingBag } from "lucide-react";
import axios from "../../axiosConfig";
import Cookie from "js-cookie";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "/api/orders/my-orders",
          {
            headers: { Authorization: `Bearer ${Cookie.get("token")}` },
            withCredentials: true,
          }
        );
        setOrders(res.data.orders);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="flex-grow pt-24 px-4 pb-24 overflow-y-auto bg-gray-50">
      <div className="w-full max-w-3xl flex flex-col items-center mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">
          Your Orders
        </h2>
        <p className="text-gray-500 mb-6">
          A list of your past and recent food orders.
        </p>
        {loading && <p>Loading your orders...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="w-full space-y-6">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-transform transform hover:scale-[1.01] hover:shadow-xl"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-red-500" />
                      {order.restaurant?.restaurantName || 'Restaurant'}
                    </h3>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 gap-4 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />{" "}
                      {new Date(order.orderDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {order.deliveryAddress}
                    </span>
                  </div>

                  <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
                    {order.foodItems?.map((item) => (
                      <li key={item?._id}>{item?.foodName || 'Food item not available'}</li>
                    ))}
                  </ul>

                  <div className="mt-5 flex justify-between items-center border-t border-gray-200 pt-4">
                    <span className="text-lg font-bold text-gray-900">
                      Total: ₹{order.totalAmount}
                    </span>
                    <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:from-red-600 hover:to-orange-600 transition-all duration-200">
                      Reorder
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">You haven't placed any orders yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
