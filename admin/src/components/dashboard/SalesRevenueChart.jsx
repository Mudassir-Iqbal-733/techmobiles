import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { useSelector } from "react-redux";

const SalesRevenueChart = () => {
  const [isDark, setIsDark] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [months, setMonths] = useState([]);
  const token = useSelector((state) => state.auth.token);

  // ✅ Detect Tailwind "dark" mode toggle
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    setIsDark(document.documentElement.classList.contains("dark"));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchSalesRevenue = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/totalSalesRevenue`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMonths(res.data.months || []);
        setSalesData(res.data.salesData || []);
        setRevenueData(res.data.revenueData || []);

      } catch (err) {
        console.error("Failed to fetch Sales/Revenue data:", err.response?.data || err.message);
      }
    };

    fetchSalesRevenue();
  }, [token]);

  const series = [
    { name: "Sales", data: salesData },
    { name: "Revenue", data: revenueData },
  ];

  const options = {
    chart: {
      type: "area",
      height: "100%",
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: isDark ? "#CBD5E1" : "#475569",
      background: "transparent",
    },
    theme: { mode: isDark ? "dark" : "light" },
    colors: ["#4F46E5", "#10B981"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    grid: { borderColor: isDark ? "#334155" : "#E2E8F0" },
    xaxis: {
      categories: months.length ? months : [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
    },
    yaxis: {
      labels: {
        formatter: (val) => `$${val}`,
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: {
        formatter: (val) => `$${val}`,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 transition-colors">
      <Chart options={options} series={series} type="area" height={350} />
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
        Sales & Revenue
      </h3>
    </div>
  );
};

export default SalesRevenueChart;
