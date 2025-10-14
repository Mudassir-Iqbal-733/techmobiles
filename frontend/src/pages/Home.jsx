import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import HeroSlider from '../components/HeroSlider'
import ProductsSection from '../components/ProductSection'
import NewArrivals from '../components/NewArrivals'
import FeaturesSection from '../components/FeaturesSection'
import Footer from '../components/Footer'
import axios from 'axios'

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    // Fetch products from backend
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/products/all"); 
          setProducts(response.data); // backend should return an array of products
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, []);
  
  return (
    <>
    <Navbar />
    <HeroSlider />
    <ProductsSection products={products} loading={loading} />
    <NewArrivals />
    <FeaturesSection />
    <Footer />
    </>
  )
}

export default Home