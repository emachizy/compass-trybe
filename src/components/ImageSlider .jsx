import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; // Import fade effect CSS
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { slides } from "../../data/data";

// import TourSearch from "./TourSearch";

const ImageSlider = () => {
  const whatsappNumber = "23409066060938"; // Replace with your actual number
  const message = "Hello! I'm interested in booking a tour."; // Custom message
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      effect="fade" // Smooth fade effect
      speed={3000} // Controls transition speed
      className="w-full h-[300px] md:h-[500px] lg:h-[700px]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="relative">
          <img
            src={slide.image}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out"
          />
          <div className="header absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
            <h2 className="text-white text-xl md:text-3xl lg:text-5xl font-bold opacity-0 fade-in">
              {slide.text}
            </h2>
            <p className="text-white text-xs md:text-lg lg:text-xl md:max-w-96 max-w-64 text-center opacity-0 fade-in">
              {slide.subtext}
            </p>
            <p className="text-white text-xs md:text-xs lg:text-xs font-stretch-50% opacity-0 fade-in">
              {slide.author}
            </p>

            {/* "Book Now" Button */}

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="book-now bg-[#9d9577] hover:bg-[#fff] text-white hover:text-[#9d9577] py-3 px-8 rounded-lg text-xl font-semibold transition-all duration-300"
            >
              Book Now
            </a>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
