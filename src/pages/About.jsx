import React from "react";
import { FaMapMarkedAlt, FaUsers, FaHandshake, FaHeart } from "react-icons/fa";
import sliderImg2 from "../assets/images/header-images/sliderImg2.jpg";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <section className="text-gray-800">
        {/* Hero Section */}
        <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <img
            src={sliderImg2}
            alt="Compass Trybe Hero"
            className="absolute inset-0 w-full h-full object-cover object-center z-10"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-white text-4xl md:text-5xl font-bold text-center px-4 z-20">
              About Compass Trybe
            </h1>
          </div>
        </div>

        {/* Intro Section */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#9d9577] mb-4">
              Navigating the World, One Journey at a Time
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At Compass Trybe, we specialize in crafting unforgettable
              adventures, connecting explorers with incredible destinations, and
              making every journey meaningful. From curated tours to
              community-driven campaigns, we are redefining how people travel.
            </p>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <FaMapMarkedAlt className="text-4xl text-[#9d9577] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Exploration</h3>
              <p className="text-gray-600">
                Discover hidden gems and breathtaking destinations across the
                globe.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <FaUsers className="text-4xl text-[#9d9577] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                Join a tribe of like-minded travelers passionate about
                connection and purpose.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <FaHandshake className="text-4xl text-[#9d9577] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Partnership</h3>
              <p className="text-gray-600">
                Collaborating with local guides, NGOs, and eco-friendly
                partners.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <FaHeart className="text-4xl text-[#9d9577] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Impact</h3>
              <p className="text-gray-600">
                Each trip supports community development and sustainable
                tourism.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[#9d9577] py-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to embark on your next adventure?
          </h2>
          <p className="mb-6 text-lg">
            Join Compass Trybe and let's navigate the world together.
          </p>
          <a
            href="https://wa.me/23409066060938?text=Hello!%20I'm%20interested%20in%20joining%20Compass%20Trybe."
            className="inline-block bg-white text-[#9d9577] font-semibold px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
          >
            Contact Us on WhatsApp
          </a>
        </div>
      </section>
      <Footer className="mt-0" />
    </>
  );
};

export default About;
