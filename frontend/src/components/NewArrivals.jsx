import React from "react";
import { Button, Rate } from "antd";
import { ArrowRight } from "lucide-react";
import newarrival from "../images/newarrival.png";

const products = [
  {
    id: 1,
    name: "Apple iPhone 17 Pro Max",
    price: 1299,
    rating: 5,
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2025/09/BG-IPHONE-2048px_IPHONE-17-PRO-MAX_BACK.jpg?auto=webp&quality=75&width=1024",
  },
  {
    id: 2,
    name: "Xiaomi 17 Ultra 5G",
    price: 899,
    rating: 4,
    image:
      "https://i02.appmifile.com/304_operatorx_operatorx_uploadTiptapImage/25/09/2025/21ef35eac7a6b396c906c833ee109cbf.jpg",
  },
  {
    id: 3,
    name: "Samsung Galaxy Z Fold 7",
    price: 1799,
    rating: 5,
    image:
      "https://sm.mashable.com/t/mashable_in/photo/default/untitled-design-20241203-173905-0000_uq75.1248.jpg",
  },
];

const NewArrivals = () => {
  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">
        New Arrivals
      </h2>

      {/* Responsive Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* ✅ Left Side: Image Section */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl flex-1 relative overflow-hidden">
          <div className="absolute top-6 left-6 z-10">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 ps-10 dark:text-white">
              Samsung Galaxy Note20 Ultra 5G
            </h3>
          </div>
          <img
            src={newarrival}
            alt="Samsung Galaxy Note20 Ultra 5G"
            className="w-full h-80 md:h-full object-contain md:object-cover rounded-2xl"
          />
        </div>

        {/* ✅ Right Side: Product List */}
<div className="flex-1">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {products.map((product) => (
      <div
        key={product.id}
        className="bg-white  p-4 rounded-xl shadow-sm hover:shadow-md transition flex flex-col items-center"
      >
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="h-28 w-full object-contain mb-3"
        />

        {/* Product Info */}
        <h4 className="text-sm md:text-base font-medium text-center">
          {product.name}
        </h4>
        <Rate
          className="text-xs my-1"
          disabled
          defaultValue={product.rating}
        />
        <p className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
          ${product.price}
        </p>
      </div>
    ))}
  </div>

  {/* View All Button */}
  <Button
    type="primary"
    icon={<ArrowRight />}
    style={{ backgroundColor: "#06b6d4", borderColor: "#06b6d4" }}
    className="w-full mt-6"
  >
    View All Products
  </Button>
</div>
</div>
    </div>
  );
};

export default NewArrivals;
