import React from "react";
import Header from "../components/Header";
import TourSearch from "../components/TourSearch";

import WhyChooseUs from "../components/WhyChooseUs";
import Itinerary from "../components/Itinerary";
import TripsSection from "../components/TripsSection";
import CounterSection from "../components/CounterSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <TourSearch />
      <WhyChooseUs />
      <Itinerary />
      <TripsSection />
      <CounterSection />
      <Footer />
    </>
  );
};

export default Home;
