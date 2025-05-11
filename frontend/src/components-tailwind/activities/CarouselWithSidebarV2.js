import React from "react";

import { useState, useEffect } from 'react';
import EventsSidebar from "./EventsSidebar";
import ActivityCarouselV6 from "./ActivityCarouselV6";

const CarouselWithSidebar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        const eventTemp = [];
        fetch('/api/v1/events/')
            .then(response => response.json())
            .then(data => {
                setEvents(data)
                setLoading(false);
            }).catch(error => {
            setLoading(false);
        });

    }, []);


  return (
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Carousel - 75% width on large screens, full width on mobile */}
        <div className="w-full lg:w-3/4 relative rounded-xl overflow-hidden shadow-lg">
          <ActivityCarouselV6 events={events}/>
        </div>

        {/* Sidebar - 25% width on large screens, full width on mobile */}
        <div className="w-full lg:w-1/4 space-y-6">
          <EventsSidebar events={events}/>
        </div>
      </div>
  );
};

export default CarouselWithSidebar;