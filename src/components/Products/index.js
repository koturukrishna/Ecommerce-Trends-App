// import AllProductsSection from "../AllProductsSection";

import { useEffect } from "react";
import Cookies from "js-cookie";

import AllProductsSection from "../AllProductsSection";
import PrimeDealsSection from "../PrimeDealsSection";

import "./index.css";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");

    if (!jwtToken) {
      navigate("/login"); // Redirect to login if no token is found
    }
  }, [navigate]);

  return (
    <>
      <div className="product-sections">
        <PrimeDealsSection />
        <AllProductsSection />
      </div>
    </>
  );
};

export default Products;
