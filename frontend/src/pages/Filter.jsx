import { useEffect, useState, useCallback } from "react";
import BrandsFilter from "../components/filters/BrandsFilter";
import PriceRangeFilter from "../components/filters/PriceRangeFilter";
import RamFilter from "../components/filters/RamFilter";
import SortByDropdown from "../components/filters/SortByDropdown";
import StorageFilter from "../components/filters/StorageFilter";
import Navbar from "../components/Navbar";
import ProductsSection from "../components/ProductSection";
import { useDebounce, useWindowScroll } from "@uidotdev/usehooks";
import axios from "axios";

const Filter = () => {
  const [filters, setFilters] = useState({
    minPrice: 10,
    maxPrice: 1000,
    brand: [],
    ram: [],
    storage: [],
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedFilters = useDebounce(filters, 600); // 600ms debounce
  const [{ x, y }, scrollTo] = useWindowScroll();

  // ✅ Stable function using useCallback
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (debouncedFilters.minPrice)
        params.append("minPrice", debouncedFilters.minPrice);
      if (debouncedFilters.maxPrice)
        params.append("maxPrice", debouncedFilters.maxPrice);
      if (debouncedFilters.brand.length > 0)
        params.append("brand", debouncedFilters.brand.join(","));
      if (debouncedFilters.ram.length > 0)
        params.append("ram", debouncedFilters.ram.join(","));
      if (debouncedFilters.storage.length > 0)
        params.append("storage", debouncedFilters.storage.join(","));

      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}/products/filters?${params.toString()}`
      );

      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedFilters]); // ✅ depends only on debounced filters

  // ✅ Fetch when debounced filters change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ✅ Handle filter updates from children
  const handleFilterChange = useCallback((filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  }, []);

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 px-4 md:px-6 mt-10">
        {/* Sidebar */}
        <div className="lg:col-span-1 w-full">
          <div className="mb-4">
            <PriceRangeFilter handleFilterChange={handleFilterChange} />
          </div>
          <div className="mb-4">
            <BrandsFilter handleFilterChange={handleFilterChange} />
          </div>
          <div className="mb-4">
            <RamFilter handleFilterChange={handleFilterChange} />
          </div>
          <div className="mb-4">
            <StorageFilter handleFilterChange={handleFilterChange} />
          </div>
        </div>

        {/* Products Section */}
        <div className="lg:col-span-5 w-full p-4 md:p-6">
          <div className="mb-4">
            <SortByDropdown />
          </div>
          <ProductsSection products={products} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Filter;
