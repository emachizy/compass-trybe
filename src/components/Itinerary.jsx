import { useState } from "react";
import itineraryImg1 from "../assets/images/itinerary-images/itineraryImg1.jpg";
import itineraryImg2 from "../assets/images/itinerary-images/itineraryImg2.jpg";
import itineraryImg3 from "../assets/images/itinerary-images/itineraryImg3.jpg";
import itineraryImg4 from "../assets/images/itinerary-images/itineraryImg4.jpg";
// import itineraryImg5 from "../assets/images/itinerary-images/itineraryImg5.jpg";
// import itineraryImg6 from "../assets/images/itinerary-images/itineraryImg6.jpg";

const events = [
  {
    id: 1,
    month: "January",
    title: "Compass Trybe Hangout",
    date: "January 29, 2025",
    location: "Ikeja, Lagos",
    description:
      "Experience the breathtaking wildlife of Africa with expert guides on an unforgettable safari adventure.",
    image: itineraryImg1,
  },
  {
    id: 2,
    month: "February",
    title: "Yacht Cruise",
    date: "February 22, 2025",
    location: "Lagos Islands",
    description:
      "Relax on white sandy beaches and explore the crystal-clear waters of the Maldives.",
    image: itineraryImg3,
  },
  {
    id: 3,
    month: "March",
    title: "Beach Camping & Games Night",
    date: "March 29 - 30, 2025",
    location: "Taqua Bay Resorts, Lagos",
    description:
      "Discover the rich history, art, and architecture of Europe's most iconic cities.",
    image: itineraryImg2,
  },
  {
    id: 4,
    month: "April",
    title: "Explore Abeokuta",
    date: "April 5, 2025",
    location: "Abeokuta, Ogun State",
    description:
      "Explore the dense jungles and diverse wildlife of the Amazon Rainforest with experienced guides.",
    image: itineraryImg1,
  },
  {
    id: 5,
    month: "May",
    title: "Capture Old Lagos 2.0",
    date: "May 25, 2025",
    location: "Lagos, Lagos",
    description:
      "Experience the dense jungles and diverse wildlife of the Amazon Rainforest with experienced guides.",
    image: itineraryImg4,
  },
  {
    id: 6,
    month: "June",
    title: "Explore Badagry",
    date: "June 29, 2025",
    location: "Badagry, Lagos",
    description:
      "Experience the dense jungles and diverse wildlife of the Amazon Rainforest with experienced guides.",
    image: itineraryImg4,
  },
];

const Itinerary = () => {
  const [selectedEvent, setSelectedEvent] = useState(events[0]); // Default to first event

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-[#9d9577] text-sm capitalize text-center">
          Just for You
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Yearly Itinerary
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side - List of Events */}
          <div className="w-full md:w-1/3 bg-white shadow-lg rounded-xl p-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Events</h3>
            <ul>
              <li>{events.month}</li>
              {events.map((event) => (
                <li
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`cursor-pointer p-2 rounded-lg text-gray-600 font-medium transition-all duration-300 ${
                    selectedEvent.id === event.id
                      ? "bg-[#9d9577] text-white"
                      : "hover:bg-[#d2d0c9] "
                  }`}
                >
                  <span className="font-bold text-black">{event.month}</span> -{" "}
                  {event.title}
                  {/* {event.title} */}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Event Details */}
          <div className="w-full md:w-2/3 bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              {selectedEvent.title}
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              📅 {selectedEvent.date} | 📍 {selectedEvent.location}
            </p>
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-56 object-cover rounded-lg mt-4"
            />
            <p className="text-gray-600 mt-4">{selectedEvent.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Itinerary;
