import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner"; // Correct named import

import ProductCard from "../ProductCard.js/index.js";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const PrimeDealsSection = () => {
  const [state, setState] = useState({
    primeDeals: [],
    apiStatus: apiStatusConstants.initial,
  });

  useEffect(() => {
    getPrimeDeals();
  }, []);

  const getPrimeDeals = async () => {
    setState((prevState) => ({
      apiStatus: apiStatusConstants.inProgress,
    }));
    try {
      const jwtToken = Cookies.get("jwt_token");

      const apiUrl = "https://apis.ccbp.in/prime-deals";
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: "GET",
      };
      const response = await fetch(apiUrl, options);
      const fetchedData = await response.json();
      // console.log(fetchedData);

      if (!response.ok) {
        // Handle non-OK responses
        throw new Error("Failed to fetch");
      }
      const updatedData = fetchedData.prime_deals.map((product) => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }));
      // console.log(updatedData, "Data find");

      setState({
        primeDeals: updatedData,
        apiStatus: apiStatusConstants.success,
      });
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        apiStatus: apiStatusConstants.failure,
      }));
      console.error("Error fetching prime deals:", error);
    }
  };

  const RenderPrimeDealsList = () => {
    const { primeDeals } = state;
    return (
      <div>
        <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
        <ul className="products-list">
          {primeDeals.map((product) => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    );
  };

  const RenderPrimeDealsFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="Register Prime"
      className="register-prime-image"
    />
  );

  const RenderLoadingView = () => (
    <div className="primedeals-loader-container">
      <ThreeDots color="#0b69ff" height="50" width="50" />
    </div>
  );

  switch (state.apiStatus) {
    case apiStatusConstants.success:
      return <RenderPrimeDealsList />;
    case apiStatusConstants.failure:
      return <RenderPrimeDealsFailureView />;
    case apiStatusConstants.inProgress:
      return <RenderLoadingView />;
    default:
      return null;
  }
};

export default PrimeDealsSection;
