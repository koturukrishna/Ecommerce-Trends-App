import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

import "./index.css";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  // const jwtToken = Cookies.get("jwt_token");
  // if (jwtToken === undefined) {
  //   return navigate("/login");
  // }

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");

    if (!jwtToken) {
      navigate("/login"); // Redirect to login if no token is found
    }
  }, [navigate]);

  return (
    <>
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">Clothes That Get YOU Noticed</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
            alt="clothes that get you noticed"
            className="home-mobile-img"
          />
          <p className="home-description">
            Fashion is part of the daily air and it does not quite help that it
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So, celebrate the seasons new and exciting
            fashion in your own way.
          </p>
          <Link to="/products">
            <button type="button" className="shop-now-button">
              Shop Now
            </button>
          </Link>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="clothes that get you noticed"
          className="home-desktop-img"
        />
      </div>
    </>
  );
};

export default Home;
