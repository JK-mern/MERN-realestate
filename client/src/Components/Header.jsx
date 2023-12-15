import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-slate-200 shadow-xl">
      <div className="flex  justify-between items-center  max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500 ">Jk</span>
            <span className="text-slate-700">Properties</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-500" />
        </form>
        <ul className="flex items-center gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-600 hover:underline  hover:scale-105">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline  text-slate-600 hover:underline  hover:scale-105">
              About
            </li>
          </Link>
          <Link to="/sign-in">
            <li className="text-slate-600 hover:underline  hover:scale-105">
              Sign in
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;