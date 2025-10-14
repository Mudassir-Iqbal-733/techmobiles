import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const ChannelAnalyticsChart = () => {
  const [isDark, setIsDark] = useState(false);

  // ✅ Detect Tailwind dark mode
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

  const series = [45, 30, 15, 10];
  const labels = ["Direct", "Referral", "Social", "Email"];

  const options = {
    chart: {
      type: "donut",
      background: "transparent",
    },
    labels,
    colors: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"],
    theme: {
      mode: isDark ? "dark" : "light",
    },
    legend: {
      position: "bottom", // ✅ Move legend on top
      horizontalAlign: "center",
      fontSize: "14px",
      labels: {
        colors: isDark ? "#E5E7EB" : "#374151",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val.toFixed(1)}%`,
      style: {
        colors: ["#fff"],
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: {
        formatter: (val) => `${val}%`,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              color: isDark ? "#E5E7EB" : "#374151",
              fontSize: "16px",
              formatter: () => "100%",
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom", // ✅ keep legend top on mobile too
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 h-[440px] transition-colors">
      {/* ✅ Title */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Channel Analytics
      </h3>

      {/* ✅ Chart */}
      <Chart options={options} series={series} type="donut" height={350} />
    </div>
  );
};

export default ChannelAnalyticsChart;
