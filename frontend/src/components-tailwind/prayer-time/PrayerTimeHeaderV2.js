import React, {Fragment, useEffect, useState} from "react";
import { MapPinIcon, ClockIcon } from '@heroicons/react/24/solid';
import Clock from "react-live-clock";

const PrayerTimeHeaderV2 = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState('Loading location...');
  const [prayerTimes, setPrayerTimes] = useState(null);
    useEffect(() => {
        fetch('/api/v1/prayer_times/darul-ihsan-berlin/')
            .then(response => response.json())
            .then(data => {
              const prayerTimesObj = [
                  { name: "Fajr", time: data.times[0], iqama: data.iqamaCalendar[0]["1"][0], active: false, icon: "🌄" },
                  { name: "Sunrise", time: data.shuruq , iqama: "", active: false, icon: "☀️" },
                  { name: "Dhuhr", time: data.times[1], iqama: data.iqamaCalendar[0]["1"][1], active: false, icon: "🕌" },
                  { name: "Asr", time: data.times[2], iqama: data.iqamaCalendar[0]["1"][2], active: false, icon: "📿" },
                  { name: "Maghrib", time: data.times[3], iqama: data.iqamaCalendar[0]["1"][3], active: false, icon: "🌇" },
                  { name: "Isha", time: data.times[4], iqama: data.iqamaCalendar[0]["1"][4], active: false, icon: "🌙" }
                ];
                setPrayerTimes(prayerTimesObj);
            }).catch(error => {
            console.log(error);
        });

    }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Mock location - in a real app, use geolocation API
    setTimeout(() => {
      setLocation('Berlin');
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM AM/PM
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  // Format date as "Weekday, Month Day"
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="text-gray-500">
      <div className="container mx-auto py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Title */}
              {/*<div className="text-center">
                  <h1 className="text-2xl font-bold">Prayer Times</h1>
              </div>*/}
              <blockquote className="text-gray-600 italic border-l-4 border-green-300 pl-4">
                  <p className="italic text-gray-500">"By Al-’Asr (the time).
                      Verily, man is [deep] in loss, except for those who believe and do good deeds, urge one another to the truth and urge one another to patience."</p>
                  <footer className="not-italic text-sm mt-2 text-gray-500">— Al-Quran 103</footer>
              </blockquote>

              {/* Location and Time */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
                  {/* Location */}
                  <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 mr-2"/>
                      <span>{location}</span>
                  </div>

                  {/* Current Time */}
                  <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 mr-2"/>
                      <div className="text-center">
                          <div className="text-xl font-semibold"><Clock format="HH:mm:ss" interval={1000}
                                                                        ticking={true}/></div>
                          <div className="text-sm">{formattedDate}</div>
                      </div>
                  </div>
              </div>
          </div>

          {/* Prayer Times - Horizontal Scroll on mobile */}
          <div className="mt-4 overflow-x-auto pb-2">
              <div className="flex gap-4 min-w-max">
                  {prayerTimes && prayerTimes.map((prayer, index) => (
                      <div
                    key={index}
                    className={`flex flex-col items-center px-4 py-2 rounded-lg min-w-[80px] ${
                        prayer.active ? 'bg-green-300' : 'bg-gray-100'
                    }`}
                >
                    <span className="text-sm font-medium">{prayer.icon} {prayer.name}</span>
                    <span className="text-lg font-bold">{prayer.time}</span>
                    <span className="text-sm">{prayer.iqama}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PrayerTimeHeaderV2;