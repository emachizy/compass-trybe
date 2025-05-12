import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { destinations } from "../../data/data";

const filters = ["All", "Lagos", "Abeokuta", "Ibadan", "Enugu"];

export default function FeaturedDestinations() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filtered =
    selectedFilter === "All"
      ? destinations
      : destinations.filter((dest) => dest.region === selectedFilter);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div>
        <p className="text-[#9d9577] text-sm capitalize text-center">
          Destinations
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 md:max-w-98 mx-auto">
          Latest from the Compass Trybe Blog
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-full border cursor-pointer ${
              selectedFilter === filter
                ? "bg-[#9d9577] text-white"
                : "bg-white text-[#9d9577]"
            } transition duration-200`}
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filtered.map((destination) => (
            <motion.div
              key={destination.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-xl overflow-hidden shadow-md bg-white"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{destination.name}</h3>
                <p className="text-sm text-gray-500">
                  {destination.region} · {destination.type}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
