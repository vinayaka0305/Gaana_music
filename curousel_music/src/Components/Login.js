import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/LoginSignUp.css";
import axios from "axios";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";
import { useUser } from "../UseProvider";

const Login = () => {
  const {onTokenHandler,onNameHandler} = useUser();
  // console.log("Context Object:", objectT); // Check the context object

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
    appType: "music",
  });

  const [geterror, seterror] = useState(null);

  const navigate = useNavigate();

  const onchangeHandler = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    seterror(null);
    if (!loginData.email) {
      seterror("email is mandatory");
      return;
    } else if (!loginData.password) {
      seterror("password is mandatory");
      return;
    }
    axios
      .post("https://academics.newtonschool.co/api/v1/user/login", loginData)
      .then((result) => {
        onTokenHandler(result.data.token);
        onNameHandler(result.data.data.name);
        console.log(result.data.token);
        console.log(result.data.data.name);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        seterror("unknow error please try after sometime");
      });
  };
  return (
    <div>
      {geterror && <h2 style={{ color: "red" }}>{geterror}</h2>}
      <form onSubmit={onSubmitHandler}>
        <div className="l-container">
          <div className="l-header">
            <div className="text">Login</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                name="email"
                onChange={onchangeHandler}
                placeholder="email"
                value={loginData.email}
                required
              />
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                name="password"
                onChange={onchangeHandler}
                placeholder="password"
                value={loginData.password}
                required
              />
            </div>
            <div className="input">
              <label htmlFor="appType">Apptype</label>
              <select
                id="appType"
                name="appType"
                onChange={onchangeHandler}
                required
              >
                <option value="music">music</option>
                <option value="ecommerce">ecom</option>
              </select>
            </div>
          </div>
          <div className="submit-container">
            <button
              className="submit"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
