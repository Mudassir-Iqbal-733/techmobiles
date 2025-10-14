import React, { useState, useEffect } from "react";
import { Table, ConfigProvider, theme } from "antd";

const TopMobilesTable = () => {
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

  // Sample top 5 mobiles sales data
  const dataSource = [
    {
      key: "1",
      name: "iPhone 14 Pro",
      brand: "Apple",
      unitsSold: 5200,
      revenue: "$6,240,000",
    },
    {
      key: "2",
      name: "Samsung Galaxy S23",
      brand: "Samsung",
      unitsSold: 4800,
      revenue: "$5,280,000",
    },
    {
      key: "3",
      name: "OnePlus 11",
      brand: "OnePlus",
      unitsSold: 3900,
      revenue: "$2,730,000",
    },
    {
      key: "4",
      name: "Xiaomi Mi 13",
      brand: "Xiaomi",
      unitsSold: 3400,
      revenue: "$1,870,000",
    },
    {
      key: "5",
      name: "Realme GT Neo 5",
      brand: "Realme",
      unitsSold: 3000,
      revenue: "$1,500,000",
    },
  ];

  const columns = [
    {
      title: "Mobile",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Units Sold",
      dataIndex: "unitsSold",
      key: "unitsSold",
      sorter: (a, b) => a.unitsSold - b.unitsSold,
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md transition-colors">
        <h2 className="text-lg md:text-xl font-semibold mb-4 dark:text-white">
         Top 5 Mobiles by Sales
        </h2>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          bordered
          className="rounded-md"
          scroll={{ x: true }}
        />
      </div>
    </ConfigProvider>
  );
};

export default TopMobilesTable;
