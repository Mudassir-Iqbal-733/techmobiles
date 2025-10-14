import React, { useState, useEffect } from "react";
import { Table, Menu, Card, Tag, message } from "antd";
import {
  ShoppingCart,
  Clock,
  CircleCheckBig,
  CircleOff,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import authApiClient from "../utils/authApiClient";

// ✅ Table Columns
const columns = [
  {
    title: "Order ID",
    dataIndex: "_id",
    key: "_id",
    render: (id) => <span className="font-mono">#{id.slice(-6)}</span>,
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "date",
    render: (date) => new Date(date).toLocaleDateString(),
  },
  {
    title: "Total",
    dataIndex: "totalPrice",
    key: "total",
    render: (price) => `$${price.toFixed(2)}`,
  },
  {
    title: "Discounted Total",
    dataIndex: "discountedPrice",
    key: "discountedTotal",
    render: (price) => `$${price.toFixed(2)}`,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag
        color={
          status === "pending"
            ? "orange"
            : status === "processing"
            ? "blue"
            : status === "shipped"
            ? "purple"
            : status === "delivered"
            ? "green"
            : status === "cancelled"
            ? "red"
            : "default"
        }
      >
        {status.toUpperCase()}
      </Tag>
    ),
  },
];

// ✅ Menu Items
const menuItems = [
  {
    key: "all",
    icon: <ShoppingCart size={16} />,
    label: "All Orders",
  },
  {
    key: "pending",
    icon: <Clock size={16} />,
    label: "Pending Orders",
  },
  {
    key: "processing",
    icon: <Clock size={16} />,
    label: "Processing Orders",
  },
  {
    key: "shipped",
    icon: <Clock size={16} />,
    label: "Shipped Orders",
  },
  {
    key: "delivered",
    icon: <CircleCheckBig size={16} />,
    label: "Delivered Orders",
  },
  {
    key: "cancelled",
    icon: <CircleOff size={16} />,
    label: "Cancelled Orders",
  },
];

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const token = useSelector((state) => state.auth?.token);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await authApiClient.get("/api/order/user-orders");
        setOrders(response.data);
      } catch (error) {
        message.error(error.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  // ✅ Filter orders
  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl my-3 font-semibold">Your Orders</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side - Filters */}
          <div className="w-full md:w-1/3">
            <Card className="shadow-sm">
              <Menu
                mode="inline"
                selectedKeys={[filter]}
                onClick={({ key }) => setFilter(key)}
                items={menuItems}
              />
            </Card>
          </div>

          {/* Right Side - Table */}
          <div className="w-full md:w-2/3">
            <Card className="shadow-sm">
              <Table
                columns={columns}
                dataSource={filteredOrders}
                rowKey="_id"
                loading={loading}
                pagination={{ pageSize: 5 }}
                scroll={{ x: true }}
              />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrdersPage;
