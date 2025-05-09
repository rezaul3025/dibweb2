import React, {Fragment} from "react";
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/solid';

const ActivityCarouselV3 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const slides = [
    {
      image: "/static/assets/img/carousel/image1.png",
      title: "Nature Retreat",
      description: "Experience breathtaking landscapes in our guided eco-tours through pristine wilderness areas.",
      address: "Brunnenstraße 122, 13355 Berlin",
      date: new Date(2023, 10, 15) // November 15, 2023
    },
    {
      image: "/static/assets/img/carousel/image2.png",
      title: "Urban Adventure",
      description: "Discover the vibrant culture and architecture of the world's most exciting metropolises.",
      address: "Brunnenstraße 122, 13355 Berlin",
      date: new Date(2023, 11, 20) // December 20, 2023
    },
    {
      image: "/static/assets/img/carousel/image3.png",
      title: "Tech Conference",
      description: "Join industry leaders for the latest innovations in technology and networking opportunities.",
      address: "Brunnenstraße 122, 13355 Berlin",
      date: new Date(2024, 0, 10) // January 10, 2024
    }
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setTimeout(nextSlide, 7000);
    return () => clearTimeout(timer);
  }, [currentIndex, autoPlay]);

  return (
    <Fragment>
      {/* Carousel Container */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            {/* Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-96 md:h-110 object-cover"
            />

            {/* Text Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end pl-12 pb-6">
              <div className="max-w-2xl">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {slide.title}
                </h3>
                <p className="text-gray-200 mb-4 line-clamp-2">
                  {slide.description}
                </p>

                {/* Address and Date */}
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex items-center text-gray-200">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    <span>{slide.address}</span>
                  </div>
                  <div className="flex items-center text-gray-200">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    <span>{formatDate(slide.date)}</span>
                  </div>
                </div>

                <button className="bg-green-500 text-white hover:bg-green-700 px-4 py-2 mb-4 rounded-md font-medium transition flex items-center">
                  View Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <button
        onClick={() => setAutoPlay(!autoPlay)}
        className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 px-2 py-1 rounded-full shadow-lg"
      >
        {autoPlay ? (
          <span className="text-xs font-medium">⏸</span>
        ) : (
          <span className="text-xs font-medium">▶</span>
        )}
      </button>
    </Fragment>
  );
};

export default ActivityCarouselV3;