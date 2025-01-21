import EmptyCartView from "../EmptyCartView";
import CartListView from "../CartListView";
import { useDispatch, useSelector } from "react-redux";
import { removeCartList } from "../reduxCartList/GlobalCartList";

import "./index.css";

const Cart = () => {
  const val = useSelector((state) => state.cartListItems.cartItems);
  const dispatch = useDispatch();
  const showEmptyView = val.length === 0;
  return (
    <>
      {showEmptyView ? (
        <EmptyCartView />
      ) : (
        <div className="cart-container">
          <div className="cart-content-container">
            <div className="heading-button">
              <h1 className="cart-heading">My Cart</h1>
              <button
                type="button"
                className="btn1"
                onClick={() => dispatch(removeCartList())}
              >
                Remove all
              </button>
            </div>
            <CartListView />
          </div>
        </div>
      )}
    </>
  );
};
export default Cart;
