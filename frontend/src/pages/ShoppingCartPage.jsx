import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, resetCart } from "../redux/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const ShoppingCartPage = () => {
  const [couponCode, setCouponCode] = useState("");
  const cart = useSelector((state) => state.cartState.cart);
  const [cartItems, setCartItems] = useState([]);
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth?.token);

  const updateStateQuantity = (id, newQty) => {
    if (newQty > 0) dispatcher(updateQuantity({ id, newQty }));
  };

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 5.0;
  const total = subtotal - discount;

  const placeOrder = async () => {
    setLoading(true);
    try {
      if (!token) {
        navigate("/login");
        return;
      }

      const orderData = {
        items: cartItems,
        totalPrice: subtotal,
        discountedPrice: total,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/order/create`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      message.success("Order placed successfully!");
      dispatcher(resetCart());
      setCartItems([]);
    } catch (error) {
      setLoading(false);
      message.error(error.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 🛒 Left Column - Cart Items */}
            <div className="lg:w-2/3 w-full">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h1 className="text-xl sm:text-2xl font-semibold mb-2">
                  Shopping Bag
                </h1>
                <p className="text-gray-600 mb-4 sm:mb-6">
                  {cartItems.length} item(s) in your bag.
                </p>

                {/* Table Header (Hidden on mobile) */}
                <div className="hidden sm:grid grid-cols-12 gap-4 border-b pb-2 mb-4 text-sm font-semibold">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="border-b py-4 flex flex-col sm:grid sm:grid-cols-12 gap-4"
                  >
                    {/* Product Info */}
                    <div className="sm:col-span-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-28 sm:w-24 sm:h-32 object-cover rounded"
                      />
                      <div className="w-full">
                        <p className="text-gray-500 text-xs sm:text-sm">
                          {item.brand}
                        </p>
                        <h3 className="font-medium text-sm sm:text-base truncate">
                          {item.name}
                        </h3>
                        <div className="mt-2 text-xs sm:text-sm text-gray-600 space-y-1">
                          <p>Color: {item.color}</p>
                          <p>Size: {item.size}</p>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="sm:col-span-2 text-right text-sm sm:text-base">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Quantity Controls */}
                    <div className="sm:col-span-2 flex justify-center sm:justify-center">
                      <div className="flex items-center">
                        <button
                          className="w-8 h-8 border rounded-full flex items-center justify-center text-lg"
                          onClick={() =>
                            updateStateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className="mx-3">{item.quantity}</span>
                        <button
                          className="w-8 h-8 border rounded-full flex items-center justify-center text-lg"
                          onClick={() =>
                            updateStateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="sm:col-span-2 text-right text-amber-600 font-semibold text-sm sm:text-base">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 💰 Right Column - Summary */}
            <div className="lg:w-1/3 w-full">
              {/* Coupon */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4">
                <h2 className="text-lg sm:text-xl font-semibold mb-3">
                  Coupon Code
                </h2>
                <p className="text-gray-500 text-sm mb-4 leading-snug">
                  Enter your discount coupon below to save more.
                </p>

                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  className="border rounded p-3 w-full mb-3 text-sm sm:text-base"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button className="w-full bg-black text-white rounded py-3 font-medium">
                  Apply
                </button>
              </div>

              {/* Cart Total */}
              <div className="bg-amber-100 rounded-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                  Cart Total
                </h2>

                <div className="space-y-2 mb-4 text-sm sm:text-base">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-3">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  disabled={loading}
                  onClick={placeOrder}
                  className={`w-full bg-white text-black border border-black rounded py-3 font-semibold ${
                    loading ? "opacity-60 cursor-not-allowed" : "hover:bg-black hover:text-white transition"
                  }`}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartPage;
