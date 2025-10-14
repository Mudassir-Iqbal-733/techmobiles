import { Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { notification } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const {isLogin } = useSelector((state) => state.auth);
 const dispatcher = useDispatch()
 const navigate = useNavigate();

 const addProductIntoCart = () => {
 
  
    const cartProduct = {
      productId: product._id,
      name: product.name,
      brand: product.brand,
      price: (product.discounted_price > 0) ? product.discounted_price : product.price,
      quantity: 1,
      totalProductPrice: (product.discounted_price > 0) ? product.discounted_price  : product.price,
      color: product.color || 'Default',
      size: product.size || 'M',
      image: product.images[0]
    };

    dispatcher(addToCart(cartProduct));

    notification.success({
      message: 'Product Added',
      description: `${product.name} has been added to your cart!`,
      placement: 'topRight',
    });
  }
  
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-lg transition relative group">
      {/* Product Image */}
      <div className="w-full h-48 mb-4 overflow-hidden rounded-t-lg">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Name */}
      <div className="p-4">
        <h3 className="text-sm font-semibold">{product.name}</h3>

      {/* Ratings */}
      <div className="flex items-center text-yellow-500 mt-2">
        {[...Array(product.rating)].map((_, i) => (
          <Star key={i} size={16} fill="gold" stroke="none" />
        ))}
      </div>

      {/* Price */}
      <p className="mt-2 font-bold text-gray-800">{product.price + "$"}</p>

      {/* Add To Cart Button */}
      <button onClick={isLogin ? addProductIntoCart : () => navigate('/login')} className="bg-cyan-500 text-white text-sm px-4 py-2 rounded mt-3  transition">
        Add to Cart
      </button>
      </div>
    </div>
  );
};

export default ProductCard;
