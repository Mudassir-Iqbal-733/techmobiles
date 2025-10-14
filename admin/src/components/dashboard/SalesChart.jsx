import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const SalesChart = () => {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  // 🔄 Watch dark mode toggle
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const series = [
    {
      name: "Sales",
      data: [420, 380, 520, 610, 430, 690],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      background: "transparent",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: isDark ? "#374151" : "#e5e7eb",
    },
    xaxis: {
      categories: ["New York", "London", "Paris", "Dubai", "Tokyo", "Sydney"],
      labels: {
        style: { colors: isDark ? "#d1d5db" : "#374151" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: isDark ? "#d1d5db" : "#374151" },
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
    },
    colors: ["#3b82f6"], // Tailwind blue
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: { height: 250 },
          plotOptions: {
            bar: { columnWidth: "70%" },
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md transition-colors">
      <h2 className="text-lg md:text-xl font-semibold mb-4 dark:text-white">
        Sales by City
      </h2>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default SalesChart;
