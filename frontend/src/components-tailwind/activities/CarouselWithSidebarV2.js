import React from "react";

import { useState, useEffect } from 'react';
import EventsSidebar from "./EventsSidebar";
import CarouselWithSidebarV2 from "./CarouselWithSidebarV2";
import ActivityCarouselV2 from "./ActivityCarouselV2";
import ActivityCarouselV3 from "./ActivityCarouselV3";
import ActivityCarouselV4 from "./ActivityCarouselV4";
import ActivityCarouselV5 from "./ActivityCarouselV5";
import ActivityCarouselV6 from "./ActivityCarouselV6";

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
          <ActivityCarouselV6/>
        </div>

        {/* Sidebar - 25% width on large screens, full width on mobile */}
        <div className="w-full lg:w-1/4 space-y-6">
          <EventsSidebar/>
        </div>
      </div>
  );
};

export default CarouselWithSidebar;