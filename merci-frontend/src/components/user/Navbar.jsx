import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Cover from "./Cover";
import { AuthBtn } from "../AuthBtn";
import { AuthContext } from "../../contexts/AuthContext";
import MobileCover from "./MobileCover";

export default function Navbar() {
  const [isCoverVisible, setIsCoverVisible] = useState(false);
  const { authState } = useContext(AuthContext);

  const toggleCover = () => {
    setIsCoverVisible(!isCoverVisible);
  };

  const closeCover = () => {
    setIsCoverVisible(false);
  };

  return (
    <>
      <nav className="w-full flex max-sm:flex-col gap-2 p-3 fixed top-0 z-10 bg-white ">
        <div className="flex items-center justify-between  w-full">
          <div className="flex justify-between gap-4">
            {/* toggle button */}
            <div
              className="toggle-button text-3xl border border-black rounded-full p-2 cursor-pointer"
              onClick={toggleCover}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
                height="48"
                width="48"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
            {/* logo */}
            <div className="logo">
              <Link
                to="/"
                className="text-2xl font-bold no-underline text-black"
              >
                merci
              </Link>
            </div>
          </div>

          {/* search bar */}
          <div className="max-sm:hidden">
            <SearchBar />
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex flex-wrap gap-2">
              <Link
                to="/favorites"
                className="text-2xl font-bold no-underline text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </Link>
              {/* cart btn */}
              <Link
                to="/cart"
                className="text-2xl font-bold no-underline text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </Link>
            </div>

            <div className="max-sm:hidden">
              <AuthBtn />
            </div>
          </div>
        </div>
        {/* mobile screen search bar */}
        <div className="sm:hidden">
          <SearchBar />
        </div>
      </nav>
      <Cover isVisible={isCoverVisible} onClose={closeCover} />
      <MobileCover isVisible={isCoverVisible} onClose={closeCover} />
    </>
  );
}
