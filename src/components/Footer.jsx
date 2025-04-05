import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import cLogo from "../assets/images/c-trybe-logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#f5f4ee] text- md:mt-20 mt-[500px] py-12 shadow-2xl">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Section - Logo & Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          {/* Logo */}
          <div className="flex flex-col items-start">
            <img
              src={cLogo} // Replace with your logo path
              alt="Logo"
              className="w-32 mb-4"
            />
            <p className="text-sm">
              Explore the world with us and make unforgettable memories.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <Link to="/" className="hover:text-[#9d9577] mb-2">
              Home
            </Link>
            <Link to="/about" className=" hover:text-[#9d9577] mb-2">
              About Us
            </Link>
            <Link to="/contact" className=" hover:text-[#9d9577] mb-2">
              Contact
            </Link>
            <Link to="/trips" className=" hover:text-[#9d9577] mb-2">
              Our Trips
            </Link>
          </div>

          {/* Social Media */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/profile.php?id=100094910823753"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="text-gray-500 hover:text-[#9d9577] text-2xl" />
              </a>
              <a
                href="https://x.com/thecompasstrybe"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-gray-500 hover:text-[#9d9577] text-2xl" />
              </a>
              <a
                href="https://www.instagram.com/thecompasstrybe/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-gray-500 hover:text-[#9d9577] text-2xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/the-compass-trybe-88a8ab338/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-gray-500 hover:text-[#9d9577] text-2xl" />
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-gray-300 mb-4">
              Subscribe to Our Newsletter
            </h4>
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg bg-gray-800 text-white border-2 border-gray-700 focus:outline-none focus:border-[#9d9577] mb-4"
            />
            <button className="bg-[#9d9577] text-white py-2 px-6 rounded-lg hover:bg-[#fff] hover:text-[#9d9577]">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} All Rights Reserved. EmTech</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
