import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";

// ✅ Dark theme for react-data-table-component
createTheme("darkMode", {
  text: {
    primary: "#E5E7EB", // gray-200
    secondary: "#9CA3AF", // gray-400
  },
  background: {
    default: "#1F2937", // gray-800
  },
  context: {
    background: "#374151", // gray-700
    text: "#E5E7EB",
  },
  divider: {
    default: "#374151", // gray-700
  },
  highlightOnHover: {
    default: "#374151",
    text: "#F9FAFB",
  },
});

// ✅ Table Columns
      const columns = [
    {
      name: "Image",
      selector: (row) => <div className="flex items-center gap-2">
        <img
          src={row.images[0]}
          alt={row.name}
          className="w-20 h-20 rounded mb-2"
        />
      </div>
    },
    {
      name: "Name",
      selector: (row) => (
        <div className="flex items-center gap-2">
          {row.name}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => `$${row.price}`,
      sortable: true,
    },
    {
      name: "Discounted Price",
      selector: (row) => `$${row.discounted_price}`,
    },
    {
      name: "In Stock",
      selector: (row) => (
        <span
          className={`px-2 py-1 text-sm rounded-full font-semibold ${row.inStock === true
            ? "bg-green-100 text-green-600"
            : row.status === false
              ? "bg-yellow-100 text-yellow-600"
              : "bg-red-100 text-red-600"
            }`}
        >
          {row.inStock ? 'Available' : 'Out Of Stock'}
        </span>
      ),
    },
  ];
// ✅ Component
const Products = () => {
  const [isDark, setIsDark] = useState(false);
  const [products, setProducts] = useState([]); // must be an array
  const [loading, setLoading] = useState(false);

  // Watch for Tailwind dark mode toggle
  useEffect(() => {
    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains("dark"));

    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/all`);
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("Unexpected response:", res.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Products
      </h2>

      {/* Responsive wrapper */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1000px]">
          <DataTable
            columns={columns}
            data={products}
            progressPending={loading}
            pagination
            highlightOnHover
            striped
            responsive
            dense
            theme={isDark ? "darkMode" : "default"}
            customStyles={{
              headCells: {
                style: {
                  fontWeight: "bold",
                  fontSize: "14px",
                  backgroundColor: isDark ? "#111827" : "#f9fafb",
                  color: isDark ? "#E5E7EB" : "#111827",
                },
              },
              rows: {
                style: {
                  fontSize: "14px",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
