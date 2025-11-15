import React, { useState, useEffect } from "react";
import SearchBar from "../../components/partner-components/dashboard/SearchBar";
import OrderTabs from "../../components/partner-components/dashboard/OrderTabs";
import OrderCard from "../../components/partner-components/dashboard/OrderCard";
import BottomNav from "../../components/partner-components/dashboard/BottomNav";
import axios from "../../axiosConfig";
import { usePartner } from "../../contexts/PartnerContext";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const { partner } = usePartner();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "/api/orders/partner-orders",
          {
            withCredentials: true,
          }
        );
        setOrders(res.data.orders);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch partner orders."
        );
      } finally {
        setLoading(false);
      }
    };
    if (partner) fetchOrders();
  }, [partner]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          withCredentials: true,
        }
      );
      // Update the local state to reflect the change immediately
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Failed to update order status", err);
      alert("Failed to update order status.");
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.status.toLowerCase() === activeTab.toLowerCase() &&
      // Ensure o.user exists before trying to access fullName
      ((o.user && o.user.fullName.toLowerCase().includes(query.toLowerCase())) ||
        o._id.slice(-4).includes(query.toLowerCase()))
  );

  const TABS = [
    {
      key: "Pending",
      label: "Preparing",
      count: orders.filter((o) => o.status === "Pending").length,
      color: "bg-yellow-500",
    },
    {
      key: "Confirmed",
      label: "Ready",
      count: orders.filter((o) => o.status === "Confirmed").length,
      color: "bg-green-500",
    },
    {
      key: "Delivered",
      label: "Picked up",
      count: orders.filter((o) => o.status === "Delivered").length,
      color: "bg-blue-500",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <h1 className="text-lg font-bold text-gray-800 mb-2 p-4">
        <span className="text-green-600 text-sm font-semibold mr-1">
          Outlet Online
        </span>{" "}
        <br /> - Accepting Orders
      </h1>

      <div className="px-4">
        <SearchBar query={query} setQuery={setQuery} />
        {loading && <p>Loading orders...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <OrderTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={TABS} />
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center mt-4">
                No {activeTab.toLowerCase()} orders found.
              </p>
            )}
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Dashboard;
