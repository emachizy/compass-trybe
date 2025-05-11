import CountUp from "react-countup";
import {
  FaMapMarkedAlt,
  FaBullseye,
  FaUserFriends,
  FaSmile,
} from "react-icons/fa";

import cLogo from "../assets/images/c-trybe-logo.png";

const stats = [
  {
    id: 1,
    label: "Destinations",
    value: 120,
    icon: <FaMapMarkedAlt className="text-3xl text-[#9d9577]" />,
  },
  {
    id: 2,
    label: "Campaigns Closed",
    value: 500,
    icon: <FaBullseye className="text-3xl text-[#9d9577]" />,
  },
  {
    id: 3,
    label: "Volunteers",
    value: 150,
    icon: <FaUserFriends className="text-3xl text-[#9d9577]" />,
  },
  {
    id: 4,
    label: "Happy Travelers",
    value: 2500,
    icon: <FaSmile className="text-3xl text-[#9d9577]" />,
  },
];

const CounterSection = () => {
  const whatsappNumber = "23409066060938";
  const message = "Hello! I'm interested in booking a tour."; // Custom message
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
  return (
    <section className="">
      {/* Background image with overlay */}
      <div
        className="h-[300px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${cLogo})`, backgroundSize: "cover" }}
      >
        <div className="absolute inset-0 bg-black/50 bg-opacity-50">
          <div className="flex flex-col justify-center items-center h-full">
            <p className="text-white">Get offer now</p>
            <h1 className="text-4xl font-bold text-white text-center">
              Ultimate Adventure Awaits!
            </h1>
            {/* "Book Now" Button */}

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="book-now bg-[#fff] hover:bg-[#9d9577] text-[#9d9577] hover:text-[#fff] py-3 px-8 rounded-lg text-xl font-semibold transition-all duration-300"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>

      {/* Stat cards overlapping from below */}
      <div className="-mt-3.5 w-full max-w-6xl px-4 z-10 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white shadow-xl rounded-xl p-6 flex flex-col items-center text-center group transition-all duration-300 hover:scale-105"
            >
              <div className="mb-2 group-hover:scale-110 transition ">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-800">
                <CountUp end={stat.value} duration={10} />
              </h3>
              <p className="text-gray-600 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Spacer to prevent overlap */}
      {/* <div className="md:pt-40 pt-[280px]" /> */}
    </section>
  );
};

export default CounterSection;
