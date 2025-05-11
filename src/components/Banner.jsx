import React from "react";

const Banner = () => {
  return (
    <div className="relative z-50 w-full overflow-hidden bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A] py-2.5 group">
      <div
        className="whitespace-nowrap text-white text-sm font-medium group-hover:[animation-play-state:paused]"
        style={{
          animation: "marquee 35s linear infinite",
        }}
      >
        <p className="inline-block px-4">
          Special Deal: Get 5% off our May trip | Be among the 10 people to
          Book⬇️ their spot
        </p>
      </div>
    </div>
  );
};

export default Banner;
