import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
} from "../reduxCartList/GlobalCartList";

import "./index.css";

const CartItem = (props) => {
  // const val = useSelector((state) => state.cartListItems.cartItems);
  const dispatch = useDispatch();

  const { cartItemDetails } = props;
  const { id, title, brand, quantity, price, imageUrl } = cartItemDetails;

  const onDeleteCartItem = () => {
    dispatch(deleteCartItem(id));
  };

  return (
    <li className="cart-item">
      <img className="cart-product-image" src={imageUrl} alt={title} />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title">{title}</p>
          <p className="cart-product-brand">by {brand}</p>
        </div>
        <div className="cart-quantity-container">
          <button type="button" className="quantity-controller-button">
            <BsDashSquare
              color="#52606D"
              size={12}
              onClick={() => dispatch(decrementCartItemQuantity(id))}
            />
          </button>
          <p className="cart-quantity">{quantity}</p>
          <button type="button" className="quantity-controller-button">
            <BsPlusSquare
              color="#52606D"
              size={12}
              onClick={() => dispatch(incrementCartItemQuantity(id))}
            />
          </button>
        </div>
        <div className="total-price-delete-container">
          <p className="cart-total-price">Rs {price * quantity}/-</p>
          <button
            className="remove-button"
            type="button"
            onClick={onDeleteCartItem}
          >
            Remove
          </button>
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={onDeleteCartItem}
      >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  );
};

export default CartItem;
