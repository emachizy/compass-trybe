import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import cTrybeLogo from "../assets/images/c-trybe-logo.png";
import { subscribeToNewsletter } from "../utils/subscribe";
import { toast } from "sonner";
import Banner from "./Banner";

const NavBar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleModalSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setLoading(true);

    try {
      const msg = await subscribeToNewsletter(email);
      toast.success(msg);
      setEmail("");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Banner />

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between gap-6 bg-white shadow-lg py-4 px-6 fixed top-0 z-30 w-full pt-12">
        <Link to="/">
          <img
            src={cTrybeLogo}
            alt="C-Trybe Logo"
            className="h-12 cursor-pointer"
          />
        </Link>
        <div className="flex justify-around gap-8 items-center space-x-6 text-gray-700 font-medium">
          <NavLink to="/" className="hover:text-[#9d9577] transition text-xl">
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-[#9d9577] transition text-xl"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-[#9d9577] transition text-xl"
          >
            Contact
          </NavLink>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#9d9577] text-white py-2 px-4 rounded-lg hover:bg-[#fff] hover:text-[#9d9577] transition cursor-pointer animate-pulse"
        >
          Keep me informed
        </button>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center justify-between p-4 shadow-lg bg-white fixed top-0 z-30 w-full pt-12">
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
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#9d9577] text-white py-2 px-4 rounded-lg hover:bg-[#fff] hover:text-[#9d9577] transition"
          >
            Keep me informed
          </button>
        </nav>
      </div>
      {/* Subscribe Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 opacity-[97%] flex items-center justify-center z-[200]">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-auto shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-[#9d9577] cursor-auto"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} />
            </button>
            <h2 className="text-xl mb-4 text-gray-800 capitalize text-center font-bold">
              Stay in the loop
            </h2>
            <form
              onSubmit={handleModalSubscribe}
              className="flex flex-col space-y-4"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#9d9577]"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#9d9577] text-white py-2 px-4 rounded-lg hover:bg-white hover:text-[#9d9577] border hover:border-[#9d9577] transition cursor-pointer"
              >
                {loading ? "Subscribing" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
};

export default NavBar;
