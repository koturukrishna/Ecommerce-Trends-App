// import AllProductsSection from "../AllProductsSection";

import AllProductsSection from "../AllProductsSection";
import PrimeDealsSection from "../PrimeDealsSection";

import "./index.css";

const Products = () => (
  <>
    <div className="product-sections">
      <PrimeDealsSection />
      <AllProductsSection />
    </div>
  </>
);

export default Products;
