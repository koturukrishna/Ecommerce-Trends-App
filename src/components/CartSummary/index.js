import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useRazorpay } from "react-razorpay";

import "./index.css";

const CartSummary = () => {
  const cartItems = useSelector((state) => state.cartListItems.cartItems);
  const { error, isLoading, Razorpay } = useRazorpay();

  const [formData, setFormData] = useState({
    totalAmount: "",
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const totalPrice = cartItems.map(
    (eachItem) => eachItem.price * eachItem.quantity
  );
  const total = totalPrice.reduce((acc, price) => acc + price);
  const itemsCount = cartItems.length;
  const text = itemsCount === 1 ? "Item in Cart" : "Items in Cart";

  const handleSubmit = (e) => {
    e.preventDefault();
    const shipping_address = {
      name: formData.fname,
      address: formData.address,
      email: formData.email,
      phone_number: formData.mobile,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    var options = {
      key: "rzp_test_pY5qkGkucb64UM",
      key_secret: "gx2jqvcUb2MgdyCbf0zclgzH",
      amount: parseInt(total) * 100,
      currency: "INR",
      name: "Nxt Trends",
      description: "for testing purpose",
      handler: function (response) {
        const paymentId = response.razorpay_payment_id;
        console.log("paymant id", paymentId, shipping_address);
        setFormData({
          // fname: "",
          // lname: "",
          // email: "",
          // mobile: "",
          totalAmount: "",
        });
      },
      theme: {
        color: "#07a291db",
      },
    };
    var pay = new Razorpay(options);
    pay.open();
  };

  return (
    <div className="cart-summary-cont">
      <div className="cart-summary">
        <h1 className="name">
          Total Order Amount: <span className="span-item">Rs {total}/-</span>
        </h1>
        <p className="items">
          {itemsCount} {text}
        </p>
        <button type="button" className="btn" onClick={handleSubmit}>
          Checkout
        </button>
      </div>
    </div>
  );
};
export default CartSummary;
