import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand mb-0 inter-700">
          Ecomm Scraper
        </Link>
        <form className="d-flex" role="search">
          {/* <ul className="nav nav-divided ">
            <li className="nav-item dropdown hovered">
              <Link
                className="nav-link dropdown-toggle text-dark"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                href="#"
              >
                {props.domain === "us" ? "United States" : "India"}
              </Link>

              {!props.toggleDomainStatus ? (
                <div className="dropdown-menu min-w-0">
                  <Link
                    className="dropdown-item"
                    onClick={() => props.toggleDomain("us")}
                  >
                    United States
                  </Link>
                  <Link
                    className="dropdown-item"
                    onClick={() => props.toggleDomain("in")}
                  >
                    India
                  </Link>
                </div>
              ) : (
                <div className="dropdown-menu min-w-0">
                  <Link className="dropdown-item">India</Link>
                </div>
              )}
            </li>
          </ul> */}
          <Link to="/amazon" type="button" className="btn btn-outline-dark me-2">
            Amazon
          </Link>
          <Link to="/flipkart" type="button" className="btn btn-outline-dark">
            Flipkart
          </Link>
        </form>
      </div>
    </nav>
  );
}
