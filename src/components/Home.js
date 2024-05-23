import React from "react";
import AmazonLogo from "./assets/amazon.svg";
import FlipkartLogo from "./assets/flipkart.svg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="container">
      <div className="px-4 py-5 my-5">
        <div className="col-lg mx-auto text-center">
          <p className="my-4 lh-lg w-50 m-auto">
            <span className="inter-700 h2">
              Scrape E-commerce Data with Ease
            </span>
            <br />
            <span className="inter-400">
              Gain valuable insights for market research, price tracking, and
              competitor analysis
            </span>
            <br />
          </p>
        </div>

        <div className="d-flex justify-content-center mt-5 m-auto">
          <Link
            to="/amazon"
            className="btn btn-light border btn-lg rounded-pill w-25"
            type="button"
          >
            <img src={AmazonLogo} width="35%" height="auto" alt="amazon-logo"/>
          </Link>
          <Link 
            to="/flipkart"
            className="btn btn-light border btn-lg rounded-pill w-25"
            type="button"
          >
            <img src={FlipkartLogo} width="45%" height="auto" alt="amazon-logo" />
          </Link>
        </div>
      </div>
    </main>
  );
}
