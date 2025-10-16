import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Input } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";

const sortOptions = [
  { label: "Newly listed", value: "new" },
  { label: "Most relevant", value: "relevant" },
  { label: "Lowest price", value: "low_price" },
  { label: "Highest price", value: "high_price" },
];

const SortByDropdown = ({ onSearchResults }) => {
  const [selected, setSelected] = useState("Most relevant");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // 🟦 Fetch all products
  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/all`
      );
      setProducts(res.data.products || res.data);
      onSearchResults(res.data.products || res.data);
    } catch (err) {
      console.error("Error fetching all products:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🟩 Fetch search results
  const fetchSearchResults = async (query) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/search?name=${query}`
      );
      setProducts(res.data.products || res.data);
      onSearchResults(res.data.products || res.data);
    } catch (error) {
      console.error("Search failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Handle sorting
  const sortProducts = (type, list) => {
    let sorted = [...list];
    switch (type) {
      case "low_price":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "high_price":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "new":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break; // "relevant" keeps default order
    }
    setProducts(sorted);
    onSearchResults(sorted);
  };

  // 🟨 Handle dropdown click
  const handleMenuClick = (e) => {
    const option = sortOptions.find((option) => option.value === e.key);
    if (option) {
      setSelected(option.label);
      sortProducts(e.key, products);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {sortOptions.map((option) => (
        <Menu.Item key={option.value}>{option.label}</Menu.Item>
      ))}
    </Menu>
  );

  // 🕒 Debounced search effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchSearchResults(searchQuery);
      } else {
        fetchAllProducts(); // clear search → show all products
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // 🔰 Initial load — all products
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="flex w-full items-center space-y-4">
      <div className="w-full flex-2">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          size="large"
          onChange={(e) => setSearchQuery(e.target.value)}
          prefix={<SearchOutlined />}
          allowClear
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
          }}
          loading={loading ? "true" : undefined}
        />
      </div>
      <div className="w-full gap-4 flex items-center justify-end flex-1">
        <span className="font-semibold text-gray-700">SORT BY:</span>
        <Dropdown overlay={menu} trigger={["click"]}>
          <button className="text-blue-500 hover:text-blue-700 flex items-center hover:cursor-pointer">
            {selected} <DownOutlined className="ml-1" />
          </button>
        </Dropdown>
      </div>
    </div>
  );
};

export default SortByDropdown;
