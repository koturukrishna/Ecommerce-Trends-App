import CartItem from "../CartItem";
import CartSummary from "../CartSummary";
import { useSelector, useDispatch } from "react-redux";

import "./index.css";

const CartListView = () => {
  const cartItems = useSelector((state) => state.cartListItems.cartItems);
  const dispatch = useDispatch();
  return (
    <>
      <ul className="cart-list">
        {cartItems.map((eachCartItem) => (
          <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
        ))}
      </ul>
      <CartSummary />
    </>
  );
};

export default CartListView;
