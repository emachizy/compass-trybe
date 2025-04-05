import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import cTrybeLogo from "../assets/images/c-trybe-logo.png";

const NavBar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileNavOpen &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setIsMobileNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileNavOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between gap-6 bg-white shadow-lg py-4 px-6">
        <Link to="/">
          <img
            src={cTrybeLogo}
            alt="C-Trybe Logo"
            className="w-24 cursor-pointer"
          />
        </Link>
        <div className="flex items-center space-x-6 text-gray-700 font-medium">
          <NavLink to="/" className="hover:text-[#9d9577] transition">
            Home
          </NavLink>
          <NavLink to="/about" className="hover:text-[#9d9577] transition">
            About
          </NavLink>
          <NavLink to="/contact" className="hover:text-[#9d9577] transition">
            Contact
          </NavLink>
        </div>
        <button className="bg-[#9d9577] text-white py-2 px-4 rounded-lg hover:bg-[#fff] hover:text-[#9d9577] transition">
          Keep me informed
        </button>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center justify-between p-4 shadow-lg bg-white">
        <Link to="/">
          <img
            src={cTrybeLogo}
            alt="C-Trybe Logo"
            className="w-20 cursor-pointer"
          />
        </Link>

        {/* Menu Toggle Button */}
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="text-gray-700"
        >
          {isMobileNavOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <div
        ref={navRef}
        className={`fixed top-0 right-0 w-3/4 h-full bg-white shadow-2xl p-6 z-[100] transform ${
          isMobileNavOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <button
          onClick={() => setIsMobileNavOpen(false)}
          className="absolute top-4 right-4 text-gray-700"
        >
          <X size={28} />
        </button>

        <nav className="mt-10 flex flex-col space-y-6 text-lg font-medium text-gray-700">
          <NavLink
            to="/"
            className="hover:text-[#9d9577] transition"
            onClick={() => setIsMobileNavOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-[#9d9577] transition"
            onClick={() => setIsMobileNavOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-[#9d9577] transition"
            onClick={() => setIsMobileNavOpen(false)}
          >
            Contact
          </NavLink>
        </nav>
      </div>

      <Outlet />
    </>
  );
};

export default NavBar;
