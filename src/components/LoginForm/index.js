import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "./index.css";

const LoginForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      navigate("/");
    }
  }, [navigate]);

  const [state, setState] = useState({
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
  });

  const onChangeUsername = (event) => {
    setState((prevState) => ({ ...prevState, username: event.target.value }));
  };

  const onChangePassword = (event) => {
    setState((prevState) => ({ ...prevState, password: event.target.value }));
  };

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    console.log("succeed");

    navigate("/");
  };

  const onSubmitFailure = (errorMsg) => {
    setState((prevState) => ({
      ...prevState,
      showSubmitError: true,
      errorMsg,
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = state;
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  return (
    <React.Fragment>
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="username-input-field"
              value={state.username}
              onChange={onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="password-input-field"
              value={state.password}
              onChange={onChangePassword}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {state.showSubmitError && (
            <p className="error-message">{state.errorMsg}</p>
          )}
        </form>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
