import React, { useState, useEffect } from 'react';

const PrayerTimesHeaderV3 = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentPrayer, setCurrentPrayer] = useState('Dhuhr');

  // Sample data - replace with your API calls
  const [location, setLocation] = useState({
    city: 'New York',
    country: 'USA',
    hijriDate: '20 Dhul-Hijjah 1445'
  });

  const [prayerTimes, setPrayerTimes] = useState({
    Fajr: '05:30',
    Sunrise: '06:45',
    Dhuhr: '12:30',
    Asr: '15:45',
    Maghrib: '18:50',
    Isha: '20:15'
  });

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Add your prayer time calculation logic here
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Format date and time
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <header className="bg-green-600 text-white shadow-lg">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Location and Date */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <LocationIcon />
                <span className="ml-2 font-medium">
                  {location.city}, {location.country}
                </span>
              </div>

              <div className="flex items-center">
                <CalendarIcon />
                <span className="ml-2">
                  {formattedDate} • {location.hijriDate}
                </span>
              </div>
            </div>

            {/* Prayer Times and Current Time */}
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-xs text-green-100">Current Prayer</p>
                <p className="font-bold">
                  {currentPrayer}: {prayerTimes[currentPrayer]}
                </p>
              </div>

              <div className="flex items-center">
                <ClockIcon />
                <span className="ml-2 font-medium">{formattedTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="container mx-auto px-3 py-2">
          {/* Top Row - Location and Time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <LocationIcon />
              <span className="ml-1 text-sm">
                {location.city}
              </span>
            </div>

            <div className="flex items-center">
              <ClockIcon />
              <span className="ml-1 text-sm">{formattedTime}</span>
            </div>
          </div>

          {/* Middle Row - Current Prayer */}
          <div className="mt-1 flex items-center justify-center">
            <div className="text-center bg-green-700 px-3 py-1 rounded-full">
              <p className="text-xs text-green-100">Now Praying</p>
              <p className="font-bold text-sm">
                {currentPrayer} {prayerTimes[currentPrayer]}
              </p>
            </div>
          </div>

          {/* Bottom Row - Date */}
          <div className="mt-1 flex items-center justify-between text-xs">
            <div className="flex items-center">
              <CalendarIcon />
              <span className="ml-1">{formattedDate.split(',')[0]}</span>
            </div>
            <span>{location.hijriDate}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

// Icon Components
const LocationIcon = () => (
  <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default PrayerTimesHeaderV3;