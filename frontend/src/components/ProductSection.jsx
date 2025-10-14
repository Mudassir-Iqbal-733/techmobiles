import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductsSection = ({ products = [], loading }) => {  
  const navigate = useNavigate();

  return (
    <section className="py-5 px-5 lg:px-20">
      <h2 className="text-2xl font-bold my-8">Featured Mobiles</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products && products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => navigate("/filter")}
              className="bg-cyan-400 text-white px-5 py-2 my-5 rounded-lg hover:bg-cyan-600 transition"
            >
              View All Products →
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No products available.</p>
      )}
    </section>
  );
};

export default ProductsSection;
