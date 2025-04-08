import { useState } from "react";
import "../css/toursearch.css";
import { toast } from "sonner";

const TourSearch = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [tourType, setTourType] = useState("");

  const whatsappNumber = "23409066060938"; // Replace with your WhatsApp number

  const handleSearch = (e) => {
    e.preventDefault();
    if (!location || !date || !tourType) {
      toast.error("Please fill all fields before searching!");
      return;
    }

    // Format the message
    const message = `Hello! I'm interested in booking a tour. Here are my details:\n\n📍 Location: ${location}\n📅 Date: ${date}\n🎒 Tour Type: ${tourType}\n\nCan you provide more information?`;

    // Encode the message for a URL
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Redirect to WhatsApp
    window.open(whatsappLink, "_blank");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white p-4 md:p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-4 w-full max-w-4xl mx-auto mt-8"
    >
      {/* Location Input */}
      <input
        type="text"
        placeholder="Search Location (Country)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Date Input */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Tour Type Dropdown */}
      <select
        value={tourType}
        onChange={(e) => setTourType(e.target.value)}
        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Tour Type</option>
        <option value="Adventure">Adventure</option>
        <option value="Beach">Beach</option>
        <option value="Historical">Historical</option>
        <option value="Wildlife">Wildlife</option>
        <option value="Wildlife">Private Tour</option>
        <option value="Wildlife">Group Tour</option>
        <option value="Wildlife">Road Trip</option>
        <option value="Wildlife">Camping</option>
      </select>

      {/* Search Button (Redirects to WhatsApp) */}
      <button
        type="submit"
        className="bg-[#9d9577] hover:bg-[#fff] text-white hover:text-[#9d9577] px-6 py-2 rounded-lg font-semibold transition-all duration-300"
      >
        Send to WhatsApp
      </button>
    </form>
  );
};

export default TourSearch;
