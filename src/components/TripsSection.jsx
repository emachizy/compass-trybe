import { useState } from "react";

import { trips } from "../../data/data";

const TripsSection = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  // const [comments, setComments] = useState([]);
  // const [input, setInput] = useState("");
  // const [editingIndex, setEditingIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const getRelativeTime = (timestamp) => {
  //   const diff = (new Date() - new Date(timestamp)) / 1000;
  //   if (diff < 60) return "Just now";
  //   if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  //   if (diff < 86400) return `${Math.floor(diff / 3600)} hour(s) ago`;
  //   const days = Math.floor(diff / 86400);
  //   return days === 1 ? "Yesterday" : `${days} day(s) ago`;
  // };

  const handleBack = () => {
    setSelectedTrip(null);
  };

  if (selectedTrip) {
    return (
      <section className="max-w-4xl mx-auto py-10 px-4">
        <button
          onClick={handleBack}
          className="bg-gray-700 text-white px-4 py-2 rounded-md mb-4 cursor-pointer"
        >
          <span className="bg-[#fff] rounded-xl p-1">🔙</span> Back to Trips
        </button>
        <h1 className="text-3xl font-bold text-gray-800">
          {selectedTrip.name}
        </h1>
        <p className="text-gray-600 mt-2">{selectedTrip.description}</p>
        <img
          src={selectedTrip.image}
          alt={selectedTrip.name}
          className="w-full h-64 object-cover rounded-lg mt-6"
          loading="lazy"
        />
        <div className="mt-6 grid grid-cols-3 gap-4">
          {selectedTrip.gallery.map((img, i) => (
            <div
              key={i}
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => {
                setSelectedImage(img);
                setCurrentImageIndex(i);
              }}
            >
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-md"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <button
              className="absolute top-6 right-6 text-white text-3xl font-bold"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            {currentImageIndex > 0 && (
              <button
                className="absolute left-6 text-white text-4xl"
                onClick={() => {
                  const newIndex = currentImageIndex - 1;
                  setCurrentImageIndex(newIndex);
                  setSelectedImage(selectedTrip.gallery[newIndex]);
                }}
              >
                ❮
              </button>
            )}
            <div className="text-center">
              <img
                src={selectedImage}
                alt="Full View"
                className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
                loading="lazy"
              />
              <p className="text-white mt-4 text-lg">
                Image {currentImageIndex + 1} of {selectedTrip.gallery.length}
              </p>
            </div>
            {currentImageIndex < selectedTrip.gallery.length - 1 && (
              <button
                className="absolute right-6 text-white text-4xl"
                onClick={() => {
                  const newIndex = currentImageIndex + 1;
                  setCurrentImageIndex(newIndex);
                  setSelectedImage(selectedTrip.gallery[newIndex]);
                }}
              >
                ❯
              </button>
            )}
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <p className="text-[#9d9577] text-sm capitalize text-center">Join Us</p>
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
              <div
                className="w-full h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${trip.image})` }}
              ></div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500"></div>
              <div className="absolute top-4 right-4 bg-white text-gray-800 text-sm font-semibold px-3 py-1 rounded-full shadow-md transition-all duration-500 group-hover:bg-[#9d9577] group-hover:text-white">
                {trip.tours} Tours
              </div>
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
