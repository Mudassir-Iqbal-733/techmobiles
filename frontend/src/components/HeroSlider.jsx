import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import image1 from "../images/image1.png";
import image2 from "../images/image2.png";
import image3 from "../images/image3.png";

const HeroSlider = () => {
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3000 })]
  );

  const slides = [
    {
      id: 1,
      title: "Samsung Galaxy S25 Ultra",
      description:
        "Samsung Ultra S25 delivers flagship-grade performance with a stunning LTPO AMOLED display, pro-level camera system, blazing fast chipset, and all-day battery — quality redefined.",
      image: image1,
      buttonText: "Buy Now",
    },
    {
      id: 2,
      title: "IPhone 17 Pro Max",
      description:
        "The iPhone 17 Pro Max — showcasing Apple’s latest A-series chip, a pro camera array with enhanced low-light performance, ultra-smooth display, and long-battery stamina — engineered for those who demand the best.",
      image: image2,
      buttonText: "Buy Now",
    },
    {
      id: 3,
      title: "Xiaomi 17 Series",
      description:
        "The Xiaomi 17 Series pushes boundaries with a next-gen processor, sleek elevated design, ultra-fast charging, and a photography system that captures every detail — delivering premium performance at an exceptional value.",
      image: image3,
      buttonText: "Buy Now",
    },
  ];

  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        {slides.map((slide) => (
          <div
            className="embla__slide relative flex-[0_0_100%]"
            key={slide.id}
          >
            {/* ✅ responsive center fix */}
            <img
  src={slide.image}
  alt={slide.title}
  className="w-full h-[400px] object-cover object-right md:h-[600px] md:object-right mx-auto"
/>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Text + Button */}
            <div className="absolute top-1/2 left-16 transform -translate-y-1/2 text-white z-10 max-w-lg">
              <h2 className="text-4xl font-bold mb-4 drop-shadow-lg sm:text-3xl text-2xl">
                {slide.title}
              </h2>
              <p className="text-lg mb-6 drop-shadow-lg sm:text-base text-sm">
                {slide.description}
              </p>
              <button className="bg-white text-black px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all text-sm sm:text-base">
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
