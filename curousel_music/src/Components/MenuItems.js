import React from "react";
import "./CSS/sideBar.css";
import { Link } from "react-router-dom";
import { useUser } from "../UseProvider";

const MenuItems = ({ closeMenu, theme, toggleTheme }) => {
  const handleLinkClick = () => {
    // Close the menu when a link is clicked
    closeMenu();
  };
  const { getToken, getName } = useUser();

  return (
    <>
      <div className="side-container">
        <div className="side-logo-cnt">
          <svg width="35" height="35" viewBox="0 0 18 18">
            <path
              className="svg_color_side"
              d="M14.351 13.545c-.804-1.281-2.036-2.215-3.448-2.664.738-.573 1.22-1.457 1.22-2.46 0-1.723-1.4-3.124-3.123-3.124-1.722 0-3.124 1.401-3.124 3.124 0 1.003.483 1.888 1.221 2.46-1.412.449-2.644 1.383-3.448 2.664C2.606 12.318 1.972 10.733 1.972 9c0-3.876 3.153-7.03 7.028-7.03 3.875 0 7.028 3.154 7.028 7.03 0 1.732-.634 3.317-1.677 4.544M6.848 8.42c0-1.187.965-2.152 2.152-2.152 1.187 0 2.152.965 2.152 2.152 0 1.186-.965 2.152-2.152 2.152-1.187 0-2.152-.966-2.152-2.152M9 16.028c-1.792 0-3.424-.68-4.666-1.787.011-.016.03-.024.042-.042.958-1.637 2.729-2.654 4.624-2.654 1.894 0 3.666 1.017 4.623 2.653.011.018.028.03.04.046C12.421 15.35 10.79 16.028 9 16.028M9 1C4.59 1 1 4.59 1 9.001 1 13.411 4.59 17 9 17s8-3.588 8-7.999C17 4.589 13.41 1 9 1"
              transform="translate(-1109 -73) translate(1089 58) translate(19 15) translate(1)"
            ></path>
          </svg>
          {getToken && getName ? (
            <div>
              <span className="M-getName">{getName}</span>
            </div>
          ) : (
            <div>
              <span>
                <Link
                  to="/login"
                  className="sideLink-l"
                  onClick={handleLinkClick}
                >
                  Login
                </Link>
              </span>
              <span>
                <Link
                  to="/signup"
                  className="sideLink-l"
                  onClick={handleLinkClick}
                >
                  / Signup
                </Link>
              </span>
            </div>
          )}
        </div>
        <div className="sideList-cnt">
          <li className="sideLi">
            <Link to="/" className="sideLink-h" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li className="sideLi">
            <Link to="/" className="sideLink" onClick={handleLinkClick}>
              Radio
            </Link>
          </li>
          <li className="sideLi">
            <Link to="/" className="sideLink" onClick={handleLinkClick}>
              Podcast
            </Link>
          </li>
          <li className="sideLi">
            <Link to="/mymusic" className="sideLink" onClick={handleLinkClick}>
              MyMusic
            </Link>
          </li>
        </div>
        <div className="h-toggle" onClick={toggleTheme}>
          <span
            className="ms-toggle"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
          {theme === "dark" ? (
            <svg width="22" height="22" viewBox="0 0 22 22">
              <g fill="none" fill-rule="evenodd">
                <g class="svg_color" opacity=".75">
                  <path
                    d="M1 12h2.333c.552 0 1-.448 1-1s-.448-1-1-1H1c-.552 0-1 .448-1 1s.448 1 1 1zM21 10h-2.333c-.553 0-1 .448-1 1s.447 1 1 1H21c.552 0 1-.448 1-1s-.448-1-1-1zM11 4.32c.552 0 1-.448 1-1V1c0-.552-.448-1-1-1s-1 .448-1 1v2.32c0 .552.448 1 1 1zM10 18.653V21c0 .552.448 1 1 1s1-.448 1-1v-2.347c0-.552-.448-1-1-1s-1 .448-1 1zM4.863 6.277c.39.392 1.022.395 1.414.006.392-.389.395-1.022.006-1.414l-1.64-1.654c-.389-.391-1.022-.394-1.414-.005-.392.388-.395 1.022-.006 1.414l1.64 1.653zM15.706 15.706c-.39.39-.39 1.024 0 1.414l1.654 1.654c.39.39 1.023.39 1.414 0 .39-.391.39-1.024 0-1.415l-1.654-1.653c-.39-.39-1.023-.39-1.414 0zM17.134 6.267l1.64-1.64c.39-.39.39-1.024 0-1.415-.39-.39-1.024-.39-1.415 0l-1.64 1.64c-.39.391-.39 1.024 0 1.415.391.39 1.024.39 1.415 0zM4.88 15.706l-1.654 1.653c-.39.39-.39 1.024 0 1.415.39.39 1.024.39 1.414 0l1.654-1.654c.39-.39.39-1.024 0-1.414-.39-.39-1.024-.39-1.414 0zM11.005 16.653c3.13 0 5.666-2.537 5.667-5.666 0-3.13-2.537-5.666-5.667-5.667-3.13 0-5.666 2.537-5.667 5.667.001 3.13 2.537 5.666 5.667 5.666zm0-9.333c2.025.004 3.663 1.642 3.667 3.667-.004 2.024-1.642 3.663-3.667 3.666-2.025-.003-3.663-1.642-3.667-3.666.004-2.025 1.642-3.663 3.667-3.667z"
                    fill="#f5f5f5"
                    transform="translate(-1204 -24) translate(1203 23) translate(1 1)"
                  ></path>
                </g>
              </g>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 30 30">
              <g fill="none" fill-rule="evenodd">
                <g
                  class="svg_stroke"
                  fill-rule="nonzero"
                  stroke="#000"
                  stroke-width=".5"
                >
                  <path
                    d="M18.062 15.441c-2.222 1.13-4.847 1.148-7.084.047-2.237-1.1-3.825-3.19-4.287-5.64-.526-2.94.62-5.93 2.975-7.768.241-.185.321-.512.193-.787-.119-.279-.415-.438-.714-.384h-.002c-2.678.463-5.047 2.012-6.545 4.28-1.497 2.269-1.99 5.055-1.364 7.7.568 2.587 2.164 4.833 4.42 6.22 2.087 1.27 4.565 1.739 6.972 1.319.193-.034.386-.074.577-.12 1.393-.337 2.697-.971 3.822-1.859.72-.584 1.35-1.27 1.872-2.036.174-.247.158-.58-.04-.81-.196-.23-.524-.296-.795-.162zm-1.447 2.489c-1.05.828-2.266 1.42-3.566 1.735-2.406.567-4.938.165-7.05-1.12-2.104-1.295-3.591-3.39-4.12-5.803-.587-2.469-.127-5.07 1.271-7.189C4.548 3.436 6.76 1.99 9.26 1.56 6.71 3.55 5.47 6.788 6.042 9.972c.5 2.653 2.219 4.916 4.641 6.109 2.422 1.193 5.264 1.176 7.672-.046-.485.713-1.07 1.352-1.74 1.896h0v-.001z"
                    transform="translate(5 5)"
                  ></path>
                </g>
              </g>
            </svg>
          )}
        </div>
        <div>
          <h3 className="p-heading-p">Go Premium</h3>
          {getToken ? (
            <Link className="m-subscribe" to={"/subscribe"}>
              <h5 className="p-heading">Get Gaana Plus</h5>
            </Link>
          ) : (
            <Link className="m-subscribe" to={"/login"}>
              <h5 className="p-heading">Get Gaana Plus</h5>
            </Link>
          )}
          <div className="premium-cnt">
            {getToken ? (
              <Link className="m-subscribe" to={"/subscribe"}>
                <div className="pre-red">Welcome Offer</div>
              </Link>
            ) : (
              <Link className="m-subscribe" to={"/login"}>
                <div className="pre-red">Welcome Offer</div>
              </Link>
            )}
            <div className="pre-white">1 Month Trial @ Just ₹1</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuItems;
