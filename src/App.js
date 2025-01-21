import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ProductItemDetails from "./components/ProductItemDetails";
import "./App.css";
import Cookies from "js-cookie";

import { Provider } from "react-redux";
import { store } from "./components/reduxCartList/GlobalCartList";

const ProtectedRoute = ({ element }) => {
  const token = Cookies.get("jwt_token");

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/login" replace />;
  }

  return element;
};

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          {/* Login Route */}
          <Route path="login" element={<LoginForm />} />

          {/* Layout and Protected Routes */}
          <Route path="/" element={<Layout />}>
            {/* Protecting Home route */}
            <Route index element={<ProtectedRoute element={<Home />} />} />

            {/* Protected Routes */}
            <Route
              path="products"
              element={<ProtectedRoute element={<Products />} />}
            />
            <Route
              path="cart"
              element={<ProtectedRoute element={<Cart />} />}
            />
            <Route
              path="products/:id"
              element={<ProtectedRoute element={<ProductItemDetails />} />}
            />
          </Route>

          {/* NotFound Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
