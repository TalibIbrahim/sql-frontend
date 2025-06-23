import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Only import Autoplay now
import "swiper/css";
import "swiper/css/autoplay";

const images = ["/food1.jpg", "/food2.jpg", "/food3.jpg", "/food4.jpg"];

const Carousel = () => {
  return (
    <div style={{ position: "relative", height: 650 }}>
      {/* Text Overlay */}
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          top: "35%",
          left: "5%",
          color: "white",
          fontSize: "2.5rem",
          fontWeight: "600",
          maxWidth: "40%",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Delicious food delivered
        <br /> from the kitchens
        <br /> fast & fresh to your door
      </div>

      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          zIndex: 5,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to right, rgba(20, 33, 61, 0.88), rgba(20, 33, 61, 0.3), rgba(20, 33, 61, 0.2))",
        }}
      />

      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        style={{ height: "100%" }}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`slide-${idx}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
