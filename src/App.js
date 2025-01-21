import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ProductItemDetails from "./components/ProductItemDetails";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./components/reduxCartList/GlobalCartList";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* Default Home route */}
            <Route path="login" element={<LoginForm />} /> {/* Login route */}
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<ProductItemDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
