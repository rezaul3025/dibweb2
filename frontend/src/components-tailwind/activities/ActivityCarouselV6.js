import React, {Fragment, useState, useEffect} from "react";
import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import moment from "moment/moment";
import {Link} from "react-router-dom";

const ActivityCarouselV6 = ({events}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  events = events.filter(function (event) {
    return event.event_type === 'CURRENT';
    });
 /* const events = [
    {
      title: "Sustainable Living Expo",
      description: "Discover eco-friendly products and learn sustainable practices from industry leaders." +
          "Discover eco-friendly products and learn sustainable practices from industry leaders." +
          "Discover eco-friendly products and learn sustainable practices from industry leaders." +
          "Discover eco-friendly products and learn sustainable practices from industry leaders." +
          "Discover eco-friendly products and learn sustainable practices from industry leaders.",
      date: "June 10, 2023 | 10:00 AM - 6:00 PM",
      address: "Green Convention Center, 123 Eco Drive",
      image: "" // Empty image URL to demonstrate fallback
    },
    {
      title: "Community Garden Festival",
      description: "Celebrate urban gardening with workshops, fresh produce, and live music.",
      date: "June 17, 2023 | 9:00 AM - 4:00 PM",
      address: "Downtown Community Park, 456 Green Street",
      image: "/static/assets/img/event1.png"
    },
    {
      title: "Renewable Energy Conference",
      description: "Explore the latest innovations in solar, wind, and clean energy solutions.",
      date: "June 24, 2023 | 8:00 AM - 5:00 PM",
      address: "Energy Innovation Hub, 789 Power Lane",
      image: "" // Empty image URL to demonstrate fallback
    }
  ];*/

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
    const timer = setTimeout(nextSlide, 7000);
    return () => clearTimeout(timer);
  }, [currentIndex, autoPlay]);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-lg bg-green-50 border border-green-100">
      {/* Carousel Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {events.map((event, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <div className="flex flex-col lg:flex-row">
              {/* Text Content */}
              <div className="p-6 md:p-8 lg:w-2/3">
                <h2 className="text-2xl font-bold text-gray-500 mb-3">{event.title}</h2>
                <p className="text-gray-600 mb-6 text-justify break-words text-gray-500">{event.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start">
                    <CalendarIcon className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium text-gray-600">{moment(event.event_datetime).format("LLL")}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPinIcon className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-600">{event.address}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    {/*<button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-medium shadow-md transition-colors">
                    Register Now
                  </button>*/}
                  <Link to={"/activity-details/"+event.id+"/"} className="border border-green-600 text-green-600 hover:bg-green-100 px-6 py-2 md:px-8 md:py-3 rounded-lg font-medium transition-colors">
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Responsive Thumbnail Image with Fallback */}
              <div className="lg:w-1/3 flex items-center justify-center p-4 lg:p-0 lg:pr-4 lg:pb-4 lg:pt-4">
                <div className="w-full h-64 md:h-72 lg:h-full rounded-lg lg:rounded-r-2xl overflow-hidden shadow-sm bg-green-50 flex items-center justify-center">
                  {event.poster_image ? (
                    <img
                      src={event.poster_image}
                      alt="  "
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mb-3">
                        <CalendarIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 font-medium">{event.title}</p>
                      <p className="text-sm text-gray-400 mt-1">Event Image</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-green-600 p-2 rounded-full shadow-lg z-10"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-green-600 p-2 rounded-full shadow-lg z-10"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {events.map((event, index) => (
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
        className="absolute top-4 right-4 bg-white/90 hover:bg-white text-green-600 p-2 rounded-full shadow-lg z-10"
      >
        {autoPlay ? (
          <span className="text-xs font-medium">⏸</span>
        ) : (
          <span className="text-xs font-medium">▶</span>
        )}
      </button>
    </div>
  );
};

export default ActivityCarouselV6;