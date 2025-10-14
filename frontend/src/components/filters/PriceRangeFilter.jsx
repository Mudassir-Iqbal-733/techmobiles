import React, { useEffect, useState } from "react";
import { Slider, Card } from "antd";

const PriceRangeFilter = ({ handleFilterChange }) => {
  const [priceRange, setPriceRange] = useState([500, 2000]);

  // ✅ When price changes, update parent filters
  useEffect(() => {
    handleFilterChange("minPrice", priceRange[0]);
    handleFilterChange("maxPrice", priceRange[1]);
  }, [priceRange, handleFilterChange]);

  return (
    <Card title="Filter By Price Range" className="w-full mx-auto mt-10 p-4">
      <Slider
        range
        min={500}
        max={2000}
        step={500}
        value={priceRange}
        onChange={setPriceRange}
        marks={{
          500: "$500",
          1000: "$1000",
          1500: "$1500",
          2000: "$2000",
        }}
      />

      <div className="flex justify-between mt-4 text-sm text-gray-600">
        <span>Min: ${priceRange[0]}</span>
        <span>Max: ${priceRange[1]}</span>
      </div>
    </Card>
  );
};

export default PriceRangeFilter;
