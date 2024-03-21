import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/LoginSignUp.css";
import axios from "axios";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import user_icon from "../Assets/person.png";

const SignUp = () => {

  const [singUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    appType: "music",
  });

  const [geterror, seterror] = useState(null);

  const navigate = useNavigate();

  const onchangeHandler = (e) => {
    setSignUpData({ ...singUpData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(singUpData);
    seterror(null);
    if (!singUpData.name) {
      seterror("user name is mandatory");
      return;
    } else if (!singUpData.email) {
      seterror("email is mandatory");
      return;
    } else if (!singUpData.password) {
      seterror("password cannot be empty");
      return;
    }
    axios
      .post("https://academics.newtonschool.co/api/v1/user/signup", singUpData)
      .then((response) => {
        console.log(response)
        navigate('/login')
      })
      .catch((error) => {
        // console.log(error);
        seterror("unknown error please try after sometimes");
      });
  };
  return (
    <div>
      {geterror && <h2 style={{ color: "red" }}>{geterror}</h2>}
      <form onSubmit={onSubmitHandler}>
        <div className="l-container">
          <div className="l-header">
            <div className="text">SignUp</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                name="name"
                id="name"
                onChange={onchangeHandler}
                placeholder="user name"
                value={singUpData.name}
                autoComplete="off"
                required
              />
            </div>
            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                id="email"
                name="email"
                onChange={onchangeHandler}
                placeholder="email"
                value={singUpData.email}
                required
              />
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                id="password"
                name="password"
                onChange={onchangeHandler}
                placeholder="password"
                value={singUpData.password}
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
            <button className="submit">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
