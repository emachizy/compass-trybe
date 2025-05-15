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
      className="bg-white p-4 md:p-6 rounded-lg flex flex-col md:flex-row items-center gap-4 w-full max-w-4xl mx-auto mt-8 shadow-2xl shadow-amber-300"
    >
      {/* Location Input */}
      {/* <input
        type="text"
        placeholder="Search Location (Country)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9d9577]"
      /> */}

      <select
        id="states"
        name="states"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9d9577]"
      >
        <option>Select state</option>
        <option value="AB">Abia State</option>
        <option value="AD">Adamawa State</option>
        <option value="AK">Akwa Ibom State</option>
        <option value="AN">Anambra State</option>
        <option value="BA">Bauchi State</option>
        <option value="BY">Bayelsa State</option>
        <option value="BE">Benue State</option>
        <option value="BO">Borno State</option>
        <option value="CR">Cross River State</option>
        <option value="DE">Delta State</option>
        <option value="EB">Ebonyi State</option>
        <option value="ED">Edo State</option>
        <option value="EK">Ekiti State</option>
        <option value="EN">Enugu State</option>
        <option value="FC">Federal Capital Territory</option>
        <option value="GO">Gombe State</option>
        <option value="IM">Imo State</option>
        <option value="JI">Jigawa State</option>
        <option value="KD">Kaduna State</option>
        <option value="KN">Kano State</option>
        <option value="KT">Katsina State</option>
        <option value="KE">Kebbi State</option>
        <option value="KO">Kogi State</option>
        <option value="KW">Kwara State</option>
        <option value="LAGOS">Lagos</option>
        <option value="NA">Nasarawa State</option>
        <option value="NI">Niger State</option>
        <option value="OG">Ogun State</option>
        <option value="ON">Ondo State</option>
        <option value="OS">Osun State</option>
        <option value="OY">Oyo State</option>
        <option value="PL">Plateau State</option>
        <option value="SO">Sokoto State</option>
        <option value="TA">Taraba State</option>
        <option value="YO">Yobe State</option>
        <option value="ZA">Zamfara State</option>
      </select>

      {/* Date Input */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9d9577]"
        placeholder="mm/dd/yyyy"
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
