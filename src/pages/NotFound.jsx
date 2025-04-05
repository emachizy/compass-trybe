import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "404 - Page Not Found",
      url: window.location.href,
      description:
        "This travel page is under construction. Explore other destinations soon!",
      isPartOf: {
        "@type": "WebSite",
        name: "Compass Trybe",
        url: "https://compasstrybe.com",
        description: "Compass Trybe - Your travel and tour booking experts.",
      },
      publisher: {
        "@type": "TravelAgency",
        name: "Compass Trybe",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.02]">
        <h1 className="text-3xl md:text-4xl font-bold text-[#9d9577] mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
          This destination is still being mapped 😔
        </h1>
        <p className="text-lg text-gray-600 mb-6 font-medium">
          Check back soon for more travel adventures! Let us know if you got
          lost on your journey here.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-[#9d9577] text-white font-semibold rounded-lg shadow-md hover:bg-[#fff] hover:text-[#9d9577] transition-all duration-300 hover:shadow-lg"
        >
          Return to Base Camp
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
