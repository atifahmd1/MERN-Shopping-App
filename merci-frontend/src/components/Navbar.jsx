import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthBtn } from "./AuthBtn";
import { AuthContext } from "../contexts/AuthContext";
import { AiOutlineHeart } from "react-icons/ai";

const Navbar = () => {
  const navigate = useNavigate();

  const { authState } = useContext(AuthContext);
  const categories = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ];
  return (
    <div>
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            merci
          </a>
          <AiOutlineHeart
            size={30}
            onClick={() => navigate("/user/favorites")}
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Offcanvas
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                {authState.user && (
                  <li
                    className="nav-item flex items-center gap-2"
                    onClick={() => navigate(`/user/${authState.user._id}`)}
                  >
                    <img
                      className="w-12 h-12 rounded-full border-2 "
                      src={authState.user?.avatar}
                      alt="user avatar"
                    />
                    <p className="text-xl font-bold m-2">
                      {authState.user?.name}
                    </p>
                  </li>
                )}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </a>
                  <ul className="dropdown-menu">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <Link
                          className="dropdown-item"
                          to={`/products/${category}`}
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <form className="d-flex mt-3" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>

              <AuthBtn />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
