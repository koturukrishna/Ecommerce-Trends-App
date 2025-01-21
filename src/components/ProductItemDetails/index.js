// Write your code here
import { useEffect, useState } from "react";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Cookies from "js-cookie";
import SimilarProductItem from "../SimilarProductItem";
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import { store, addCartItem } from "../reduxCartList/GlobalCartList";
import "./index.css";

const apiStatusConstant = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const ProductItemDetails = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [state, setState] = useState({
    productData: {},
    similarProducts: [],
    quantity: 1,
    apiStatus: apiStatusConstant.initial,
  });

  useEffect(() => {
    getProductDetails();
    // eslint-disable-next-line
  }, []);

  const getProductDetails = async () => {
    setState((prevState) => ({
      ...prevState,
      apiStatus: apiStatusConstant.inProgress,
    }));
    const { id } = params;
    console.log(id);
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `https://apis.ccbp.in/products/${id}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken} `,
      },
    };
    const response = await fetch(apiUrl, options);
    if (response.ok === true) {
      const data = await response.json();
      const fetchedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReview: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
      };
      console.log(fetchedData);
      const productsData = data.similar_products.map((product) => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }));
      setState((prevState) => ({
        ...prevState,
        productData: fetchedData,
        similarProducts: productsData,
        apiStatus: apiStatusConstant.success,
      }));
    }
    if (response.status === 404) {
      setState((prevState) => ({
        ...prevState,
        apiStatus: apiStatusConstant.failure,
      }));
    }
  };

  const onGoBackProducts = () => {
    navigate("/products");
  };

  const RenderLoadingView = () => (
    <div className="loading-view-container" testid="loader">
      <ThreeDots color="#0b69ff" height="50" width="50" />
    </div>
  );

  const RenderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="heading">Product Not Found</h1>
      <button type="button" className="continue-btn" onClick={onGoBackProducts}>
        Continue Shopping
      </button>
    </div>
  );

  const onItemDecrement = () => {
    const { quantity } = state;
    if (quantity > 1) {
      setState((prevState) => ({
        ...prevState,
        quantity: prevState.quantity - 1,
      }));
    }
  };

  const onItemIncrement = () => {
    setState((prevState) => ({
      ...prevState,
      quantity: prevState.quantity + 1,
    }));
  };

  const RenderProductsView = (props) => {
    // const val = useSelector((state) => state.cartListItems.cartItems);
    const dispatch = useDispatch();
    const { productData, quantity, similarProducts } = props;
    const {
      imageUrl,
      title,
      // id,
      price,
      description,
      brand,
      totalReview,
      rating,
      availability,
    } = productData;
    return (
      <>
        <div className="product-details-success-view">
          <div className="product-details-container">
            <img src={imageUrl} alt="product" className="product-image" />
            <div className="product">
              <h1 className="product-name">{title}</h1>
              <p className="price-details">Rs {price}/-</p>
              <div className="rating-and-reviews-count">
                <div className="rating-container">
                  <p className="rating">{rating}</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                    className="star"
                  />
                </div>
                <p className="reviews-count">{totalReview} Reviews</p>
              </div>

              <p className="product-description">{description}</p>
              <div className="label-value-container">
                <p className="label">Available:</p>
                <p className="value">{availability}</p>
              </div>
              <div className="label-value-container">
                <p className="label">Brand:</p>
                <p className="value">{brand}</p>
              </div>
              <hr className="horizontal-line" />
              <div className="quantity-container">
                <button
                  type="button"
                  className="quantity-controller-button"
                  onClick={onItemDecrement}
                >
                  <BsDashSquare className="quantity-controller-icon" />
                </button>
                <p className="quantity">{quantity}</p>
                <button
                  type="button"
                  className="quantity-controller-button"
                  onClick={onItemIncrement}
                >
                  <BsPlusSquare className="quantity-controller-icon" />
                </button>
              </div>
              <button
                type="button"
                className="button add-to-cart-btn"
                onClick={() =>
                  dispatch(addCartItem({ ...productData, quantity }))
                }
              >
                ADD TO CART
              </button>
            </div>
          </div>
          <h1 className="similar-products-heading">Similar Products</h1>
          <ul className="similar-products-list">
            {similarProducts.map((product) => (
              <SimilarProductItem productDetails={product} key={product.id} />
            ))}
          </ul>
        </div>
      </>
    );
  };

  const RenderViews = (props) => {
    const { apiStatus } = props;
    switch (apiStatus) {
      case apiStatusConstant.success:
        return (
          <Provider store={store}>
            <RenderProductsView {...props} />
          </Provider>
        );
      case apiStatusConstant.inProgress:
        return <RenderLoadingView />;
      case apiStatusConstant.failure:
        return <RenderFailureView />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="product-item-details-container">
        <RenderViews {...state} />
      </div>
    </>
  );
};

export default ProductItemDetails;
