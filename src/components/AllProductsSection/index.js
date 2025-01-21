import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Cookies from "js-cookie";
import "./index.css";
import ProductCard from "../ProductCard.js/index.js";

const FiltersGroup = React.lazy(() => import("../FiltersGroup/index.js"));
const ProductsHeader = React.lazy(() => import("../ProductsHeader/index.js"));

const categoryOptions = [
  {
    name: "Clothing",
    categoryId: "1",
  },
  {
    name: "Electronics",
    categoryId: "2",
  },
  {
    name: "Appliances",
    categoryId: "3",
  },
  {
    name: "Grocery",
    categoryId: "4",
  },
  {
    name: "Toys",
    categoryId: "5",
  },
];

const sortbyOptions = [
  {
    optionId: "PRICE_HIGH",
    displayText: "Price (High-Low)",
  },
  {
    optionId: "PRICE_LOW",
    displayText: "Price (Low-High)",
  },
];

const ratingsList = [
  {
    ratingId: "4",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png",
  },
  {
    ratingId: "3",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png",
  },
  {
    ratingId: "2",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png",
  },
  {
    ratingId: "1",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png",
  },
];

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const AllProductsSection = () => {
  const [state, setState] = useState({
    productsList: [],
    apiStatus: apiStatusConstants.initial,
    activeOptionId: sortbyOptions[0].optionId,
    activeCategoryId: "",
    searchInput: "",
    activeRatingId: "",
  });

  useEffect(() => {
    const getProducts = async () => {
      setState((prevState) => ({
        ...prevState,
        apiStatus: apiStatusConstants.inProgress,
      }));
      try {
        const jwtToken = Cookies.get("jwt_token");
        const {
          activeOptionId,
          activeCategoryId,
          searchInput,
          activeRatingId,
        } = state;
        const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`;
        const options = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          method: "GET",
        };
        const response = await fetch(apiUrl, options);
        const fetchedData = await response.json();
        // console.log(fetchedData, "Krishna");

        if (!response.ok) {
          // Handle non-OK responses
          throw new Error("Failed to fetch");
        }

        const updatedData = fetchedData.products.map((product) => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
        }));
        setState((prevState) => ({
          ...prevState,
          productsList: updatedData,
          apiStatus: apiStatusConstants.success,
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          apiStatus: apiStatusConstants.failure,
        }));
        console.error("Error fetching prime deals:", error);
      }
    };
    getProducts();
    // eslint-disable-next-line
  }, [
    state.activeCategoryId,
    state.activeOptionId,
    state.searchInput,
    state.activeRatingId,
  ]);

  const changeSortby = (activeOptionId) => {
    setState((prevState) => ({
      ...prevState,
      activeOptionId: activeOptionId,
    }));
  };

  const clearFilters = () => {
    setState((prevState) => ({
      ...prevState,
      searchInput: "",
      activeCategoryId: "",
      activeRatingId: "",
    }));
  };

  const changeRating = (activeRatingId) => {
    setState((prevState) => ({ ...prevState, activeRatingId: activeRatingId }));
  };

  const changeCategory = (activeCategoryId) => {
    setState((prevState) => ({
      ...prevState,
      activeCategoryId: activeCategoryId,
    }));
  };

  const enterSearchInput = () => {};

  const changeSearchInput = (searchInput) => {
    setState((prevState) => ({ ...prevState, searchInput: searchInput }));
  };

  const RenderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  );

  const RenderProductsListView = (props) => {
    const { productsList, activeOptionId } = props;
    const shouldShowProductsList = productsList.length > 0;

    return shouldShowProductsList ? (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={changeSortby}
        />
        <ul className="products-list">
          {productsList.map((product) => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    );
  };

  const RenderLoadingView = () => {
    <div className="products-loader-container">
      <ThreeDots color="#0b69ff" height="50" width="50" />
    </div>;
  };

  const RenderAllProducts = () => {
    switch (state.apiStatus) {
      case apiStatusConstants.success:
        return <RenderProductsListView {...state} />;
      case apiStatusConstants.failure:
        return <RenderFailureView />;
      case apiStatusConstants.inProgress:
        return <RenderLoadingView />;
      default:
        return null;
    }
  };

  return (
    <div className="all-products-section">
      <FiltersGroup
        searchInput={state.searchInput}
        categoryOptions={categoryOptions}
        ratingsList={ratingsList}
        changeSearchInput={changeSearchInput}
        enterSearchInput={enterSearchInput}
        activeCategoryId={state.activeCategoryId}
        activeRatingId={state.activeRatingId}
        changeCategory={changeCategory}
        changeRating={changeRating}
        clearFilters={clearFilters}
      />
      <RenderAllProducts />
    </div>
  );
};

export default AllProductsSection;
