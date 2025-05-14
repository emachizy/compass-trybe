import { FaStar, FaShieldAlt, FaGlobe, FaUserCheck } from "react-icons/fa"; // Import icons
import "../css/whychooseus.css";
const WhyChooseUs = () => {
  const features = [
    {
      icon: (
        <FaStar className="text-[#9d9577] text-3xl group-hover:text-white" />
      ),
      title: "Top-Rated Service",
      description:
        "We provide the best experiences with top reviews from our customers.",
    },
    {
      icon: (
        <FaShieldAlt className="text-green-500 text-3xl group-hover:text-white" />
      ),
      title: "Secure & Trusted",
      description:
        "Your safety and trust are our priority, with verified tours and guides.",
    },
    {
      icon: (
        <FaGlobe className="text-yellow-500 text-3xl group-hover:text-white" />
      ),
      title: "Worldwide Tours",
      description:
        "Explore the most amazing destinations across the globe with us.",
    },
    {
      icon: (
        <FaUserCheck className="text-red-500 text-3xl group-hover:text-white" />
      ),
      title: "Personalized Trips",
      description: "Custom travel plans to match your preferences and style.",
    },
  ];

  return (
    <section className="why-choose-us py-12 bg-gray-100 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <p className="text-[#9d9577] text-sm capitalize text-center">
          Why choose us?
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Our Unique Offerings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4 items-start border border-gray-200 transition-all duration-300 hover:bg-[#9d9577] hover:text-white hover:shadow-xl"
            >
              <div className="group-hover:animate-bounce">{feature.icon}</div>
              <h3 className="text-xl font-semibold group-hover:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 group-hover:text-white">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
