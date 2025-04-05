import { useState } from "react";

const trips = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "/assets/trips/bali.jpg",
    gallery: [
      "/assets/trips/bali1.jpg",
      "/assets/trips/bali2.jpg",
      "/assets/trips/bali3.jpg",
    ],
    description:
      "Bali is a beautiful island in Indonesia, known for its beaches, temples, and vibrant culture.",
  },
  {
    id: 2,
    name: "Santorini, Greece",
    image: "/assets/trips/santorini.jpg",
    gallery: [
      "/assets/trips/santorini1.jpg",
      "/assets/trips/santorini2.jpg",
      "/assets/trips/santorini3.jpg",
    ],
    description:
      "Santorini is famous for its stunning white-washed buildings, blue domes, and breathtaking sunsets.",
  },
  {
    id: 3,
    name: "Maui, Hawaii",
    image: "/assets/trips/maui.jpg",
    gallery: [
      "/assets/trips/maui1.jpg",
      "/assets/trips/maui2.jpg",
      "/assets/trips/maui3.jpg",
    ],
    description:
      "Maui is one of the most beautiful Hawaiian islands, with lush landscapes and world-famous beaches.",
  },
  {
    id: 4,
    name: "Kyoto, Japan",
    image: "/assets/trips/kyoto.jpg",
    gallery: [
      "/assets/trips/kyoto1.jpg",
      "/assets/trips/kyoto2.jpg",
      "/assets/trips/kyoto3.jpg",
    ],
    description:
      "Kyoto is a historic city in Japan, famous for its ancient temples, cherry blossoms, and tea culture.",
  },
];

const TripsSection = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Function to go back to trip list
  const handleBack = () => {
    setSelectedTrip(null);
  };

  if (selectedTrip) {
    return (
      <section className="max-w-4xl mx-auto py-10 px-4">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="bg-gray-700 text-white px-4 py-2 rounded-md mb-4"
        >
          🔙 Back to Trips
        </button>

        {/* Trip Details */}
        <h1 className="text-3xl font-bold text-gray-800">
          {selectedTrip.name}
        </h1>
        <p className="text-gray-600 mt-2">{selectedTrip.description}</p>

        {/* Main Image */}
        <div className="mt-6">
          <img
            src={selectedTrip.image}
            alt={selectedTrip.name}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Image Gallery */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {selectedTrip.gallery.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${selectedTrip.name} ${index + 1}`}
              className="w-full h-24 object-cover rounded-md shadow-md hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Our Featured Trips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              className="relative block rounded-lg overflow-hidden shadow-lg group cursor-pointer"
            >
              {/* Background Image */}
              <div
                className="w-full h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${trip.image})` }}
              ></div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500"></div>

              {/* Tours Count (Top Right) */}
              <div className="absolute top-4 right-4 bg-white text-gray-800 text-sm font-semibold px-3 py-1 rounded-full shadow-md transition-all duration-500 group-hover:bg-green-500 group-hover:text-white">
                {trip.tours} Tours
              </div>

              {/* Destination Name (Bottom Left) */}
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-xl font-bold transition-transform duration-500 group-hover:translate-y-2">
                  {trip.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripsSection;
