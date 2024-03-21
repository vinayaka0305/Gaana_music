import React from "react";
import "./CSS/Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
    <div className="outer">
      <div className="inner">
        <div className="row-1">
          <strong className="fheading">Bas Bajna Chahiye Gaana</strong>
          <p className="fpara">
            Gaana is your gateway to the best and latest in music, offering over
            30 million songs across diverse languages including Hindi, English,
            Bollywood, and regional tracks. Stream your favourite Hindi songs,
            Bollywood music, English MP3 songs, radio, podcast and regional
            music online or download songs to enjoy anytime, anywhere!
          </p>
        </div>
          <div className="row-2">
            <div className="f-Slink">
              <h3 className="fpara">KEEP IN TOUCH</h3>
              <div className="f-Alink">
                <img
                  src="https://a10.gaanacdn.com/images/section/facebookIcon_1706769881.svg"
                  alt="facebook"
                />
                <img
                  src="https://a10.gaanacdn.com/images/section/twitter-icon_1706769822.svg"
                  alt="twitter"
                />
              </div>
            </div>
            <div className="f-strLink">
              <h3 className="fpara">EXPERIENCE APP</h3>
              <div className="f-Alink">
                <img
                  src="https://a10.gaanacdn.com/images/section/playStoreIcon_1705994070.svg"
                  alt="Play store"
                />
                <img
                  src="https://a10.gaanacdn.com/images/section/appStoreIcon_1705994098.svg"
                  alt="App Store"
                />
              </div>
            </div>
          </div>
          <div className="row-3">
            <div className="f-links">
              <Link className="fLink">
                <span className="fTerms">Terms of Use</span>
              </Link>
              <Link className="fLink">
                <span className="fTerms">Privacy Policy</span>
              </Link>
              <Link className="fLink">
                <span className="fTerms">About Us</span>
              </Link>
              <Link className="fLink">
                <span className="fTerms">FAQ</span>
              </Link>
            </div>
          </div>
          <div className="row-4">
            <p className="copyr">
              © Entertainment Network India Ltd. 2024, All Rights Reserved
            </p>
          </div>
      </div>
      </div>
    </>
  );
};

export default Footer;
