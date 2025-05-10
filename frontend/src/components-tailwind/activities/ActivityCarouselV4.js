import React, {Fragment} from "react";
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';

const ActivityCarouselV4 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const events = [
    {
      title: "Community Cleanup Day",
      description: "Join us for a day of cleaning up local parks and neighborhoods. All supplies provided.",
      date: "Saturday, May 15, 2023",
      time: "9:00 AM - 2:00 PM",
      address: "Central Park, Main Entrance"
    },
    {
      title: "Sustainability Workshop",
      description: "Learn eco-friendly practices for your home and community from leading environmental experts.",
      date: "Wednesday, May 20, 2023",
      time: "6:00 PM - 8:00 PM",
      address: "Green Community Center, Room 203"
    },
    {
      title: "Farmer's Market Opening",
      description: "Celebrate the opening of our seasonal farmer's market with local organic produce and live music.",
      date: "Sunday, May 25, 2023",
      time: "10:00 AM - 4:00 PM",
      address: "Downtown Plaza, 5th Avenue"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setTimeout(nextSlide, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex, autoPlay]);

  return (
    <Fragment>
      {/* Carousel Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {events.map((event, index) => (
          <div key={index} className="w-full flex-shrink-0 p-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-green-800 mb-3">{event.title}</h2>
              <p className="text-gray-600 mb-5">{event.description}</p>

              <div className="space-y-3">
                <div className="flex items-start">
                  <CalendarIcon className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium">{event.date}</p>
                    <p className="text-gray-600">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{event.address}</p>
                  </div>
                </div>
              </div>

              <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-green-600 p-2 rounded-full shadow-md"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-green-600 p-2 rounded-full shadow-md"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index ? 'bg-green-600 w-6' : 'bg-green-200'
            }`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <button
        onClick={() => setAutoPlay(!autoPlay)}
        className="absolute top-4 right-4 bg-white/90 hover:bg-white text-green-600 p-2 rounded-full shadow-md"
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

export default ActivityCarouselV4;