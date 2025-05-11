import React from "react";
import Header from "../components/Header";
import TourSearch from "../components/TourSearch";

import WhyChooseUs from "../components/WhyChooseUs";
import Itinerary from "../components/Itinerary";
import TripsSection from "../components/TripsSection";
import CounterSection from "../components/CounterSection";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import FeaturedDestinations from "../components/FeaturedDestinations";
// import Banner from "../components/Banner";

const Home = () => {
  return (
    <>
      <Header />
      <TourSearch />

      <WhyChooseUs />
      <Itinerary />
      <TripsSection />

      <div className="max-w-6xl mx-auto">
        <CounterSection />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 my-10">
        <Testimonials />
      </div>
      <FeaturedDestinations />
      <Footer />
    </>
  );
};

export default Home;
