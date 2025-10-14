import { useState, useEffect } from "react";
import { DollarSign, ShoppingCart, Users, RotateCcw } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";

const StoreCard = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const token = useSelector((state) => state.auth.token);

  const [stats, setStats] = useState([
    {
      icon: DollarSign,
      title: "Total Sales",
      value: "$0",
      change: 0,
      today: 0,
      bgcolor: "#E8F9FF",
      color: "#578FCA",
    },
    {
      icon: ShoppingCart,
      title: "Total Orders",
      value: "0",
      change: 0,
      today: 0,
      bgcolor: "#C9E9D2",
      color: "#789DBC",
    },
    {
      icon: Users,
      title: "Visitors",
      value: "0",
      change: 0,
      today: 0,
      bgcolor: "#FFCCE1",
      color: "#E195AB",
    },
    {
      icon: RotateCcw,
      title: "Refunded",
      value: "0",
      change: 0,
      today: 0,
      bgcolor: "#B3C8CF",
      color: "#4b7684",
    },
  ]);

  useEffect(() => {
    if (!token) return; // ✅ only run if token exists

    const fetchCardData = async () => {
      console.log("Token before request:", token);

      try {
        const response = await axios.get("http://localhost:3000/api/admin/totalCards", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ correct header format
          },
        });

        console.log("Card Data Response:", response.data);

        const totalOrders = response.data.totalOrders || 0;
        const totalSales = response.data.totalRevenue || 0;

        setTotalOrders(totalOrders);
        setTotalSales(totalSales);

        // ✅ Update stats after getting API data
        setStats([
          {
            icon: DollarSign,
            title: "Total Sales",
            value: `$${totalSales}`,
            change: 12,
            today: 340,
            bgcolor: "#E8F9FF",
            color: "#578FCA",
          },
          {
            icon: ShoppingCart,
            title: "Total Orders",
            value: `${totalOrders}`,
            change: -3,
            today: 290,
            bgcolor: "#C9E9D2",
            color: "#789DBC",
          },
          {
            icon: Users,
            title: "Visitors",
            value: "820,100",
            change: 8,
            today: 120,
            bgcolor: "#FFCCE1",
            color: "#E195AB",
          },
          {
            icon: RotateCcw,
            title: "Refunded",
            value: "21,980",
            change: -4,
            today: 31,
            bgcolor: "#B3C8CF",
            color: "#4b7684",
          },
        ]);
      } catch (error) {
        console.error(
          "❌ Failed to fetch card data:",
          error.response?.data || error.message
        );
      }
    };

    fetchCardData();
  }, [token]); // ✅ Only run once or when token changes

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ icon: Icon, title, value, change, today, bgcolor, color }, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 flex flex-col flex-1 h-full transition-colors hover:bg-cyan-100"
        >
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div
              style={{ backgroundColor: bgcolor }}
              className="p-3 rounded-2xl flex items-center justify-center"
            >
              <Icon style={{ color: color }} className="w-6 h-6" />
            </div>
            <h4 className="font-medium text-gray-700 dark:text-gray-200">
              {title}
            </h4>
          </div>

          {/* Value */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </h2>

          {/* Change Info */}
          <div className="flex items-center text-sm mt-2">
            <span
              className={
                change > 0
                  ? "text-green-600 dark:text-green-400 font-medium"
                  : "text-red-500 dark:text-red-400 font-medium"
              }
            >
              {change}% {change > 0 ? "↑" : "↓"}
            </span>
            <span className="text-gray-400 dark:text-gray-500 ml-2">
              | +{today} today
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreCard;
