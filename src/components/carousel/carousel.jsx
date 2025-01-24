import { Carousel as MTCarousel, IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export function CustomCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://wallpapercave.com/wp/wp2430383.jpg",
    "https://wallpapersok.com/images/hd/adidas-shoes-hd-sports-0a980004fe1m1y8k-0a980004fe1m1y8k.jpg",
    "https://i.pinimg.com/originals/d0/9a/42/d09a4220b94d4e0d53e19056318ba02c.jpg",
  ];

  // Function to automatically change the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <MTCarousel
      className="rounded-xl backdrop-blur-lg backdrop-saturate-180 bg-black bg-opacity-60 h-[620px] transition-all duration-500 mb-[60px] mt-[5px]"
      activeIndex={currentIndex} // Control active slide
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
    >
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`image ${index + 1}`}
          className="h-full w-full object-cover transition-all duration-500"
        />
      ))}
    </MTCarousel>
  );
}
