import React from "react";

import { useState, useEffect } from 'react';
import EventsSidebar from "./EventsSidebar";

const CarouselWithSidebar = ({ carouselItems }) => {
  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Sample sidebar items
  const sidebarItems = [
    {
      title: 'Latest News',
      items: [
        'New product launch next week',
        'Company reaches 1M customers',
        'Upcoming industry conference'
      ]
    },
    {
      title: 'Popular Posts',
      items: [
        'How to optimize your workflow',
        'Top 10 tips for beginners',
        'Interview with industry leaders'
      ]
    }
  ];

  // Carousel controls
  const nextSlide = () => {
    setCurrentIndex(prev => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play effect
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay]);

  return (
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Carousel - 75% width on large screens, full width on mobile */}
          <div className="w-full lg:w-3/4 relative rounded-xl overflow-hidden shadow-lg">
              <div
                  className="flex h-full transition-transform duration-700 ease-in-out"
                  style={{transform: `translateX(-${currentIndex * 100}%)`}}
              >
                  {carouselItems.map((item, index) => (
                      <div
                          key={index}
                          className="w-full flex-shrink-0"
                      >
                          {item}
                      </div>
                  ))}
              </div>

              {/* Navigation arrows */}
              <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md"
                  aria-label="Previous slide"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                  </svg>
              </button>
              <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md"
                  aria-label="Next slide"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
              </button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {carouselItems.map((_, index) => (
                      <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-white w-6' : 'bg-white/50'}`}
                          aria-label={`Go to slide ${index + 1}`}
                      />
                  ))}
              </div>

              {/* Auto-play toggle */}
              <button
                  onClick={() => setAutoPlay(!autoPlay)}
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                      {autoPlay ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                      )}
                  </svg>
              </button>
          </div>

          {/* Sidebar - 25% width on large screens, full width on mobile */}
          <div className="w-full lg:w-1/4 space-y-6">
              <EventsSidebar />
          </div>
      </div>
  );
};

export default CarouselWithSidebar;