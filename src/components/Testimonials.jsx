import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { testimonials } from "../../data/data";

// StarIcon component
const StarIcon = () => (
  <svg
    width="16"
    height="15"
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.524.464a.5.5 0 0 1 .952 0l1.432 4.41a.5.5 0 0 0 .476.345h4.637a.5.5 0 0 1 .294.904L11.563 8.85a.5.5 0 0 0-.181.559l1.433 4.41a.5.5 0 0 1-.77.559L8.294 11.65a.5.5 0 0 0-.588 0l-3.751 2.726a.5.5 0 0 1-.77-.56l1.433-4.41a.5.5 0 0 0-.181-.558L.685 6.123A.5.5 0 0 1 .98 5.22h4.637a.5.5 0 0 0 .476-.346z"
      fill="#FF532E"
    />
  </svg>
);

// TestimonialCard component
const TestimonialCard = ({ name, role, image, feedback }) => (
  <div className="w-full flex flex-col items-center p-10 rounded-lg bg-white shadow-2xl">
    <img className="h-20 w-20 rounded-full" src={image} alt={name} />
    <h2 className="text-lg text-gray-900 font-medium mt-2">{name}</h2>
    <p className="text-sm text-gray-500">{role}</p>
    <div className="flex items-center justify-center mt-3 gap-1">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <StarIcon key={i} />
        ))}
    </div>
    <p className="text-center text-[15px] mt-3 text-gray-500">{feedback}</p>
  </div>
);

const Testimonials = () => {
  return (
    <>
      <div>
        <p className="text-[#9d9577] text-sm capitalize text-center">
          Testimonials
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 md:max-w-98 mx-auto">
          Words from some of our happy clients
        </h2>
      </div>
      <div className="w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard {...testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Testimonials;
