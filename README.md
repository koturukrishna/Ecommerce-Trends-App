# NXT Trends App


NXT Trends is an e-commerce-like application built using React.js functional components, useState, and useEffect. The application leverages Redux Toolkit for state management to handle cart functionality, including adding products, updating product quantities, and clearing the cart.

Features
User Authentication:

A login page validates the username and password using an API call.
Upon successful login, a JSON Web Token (JWT) is retrieved, stored in sessionStorage, and used for session management.
Users cannot access the login page once logged in unless they log out.
Token validation ensures secure navigation across pages.
Routing:

Implemented React Router for seamless navigation between pages: Home, Products, and Cart.
Product Management:

Fetches product data via API and stores it in a useState variable.
Features filters for products based on name, rating, and category.
Users can add products to the cart, adjust quantities, or remove items.
Cart Functionality:

Cart data is managed globally using Redux Toolkit.
Displays the total number of items in the cart and the total amount.
Allows clearing the entire cart with a single action.
Payment Integration:

Razorpay is integrated for secure and reliable payment processing.
