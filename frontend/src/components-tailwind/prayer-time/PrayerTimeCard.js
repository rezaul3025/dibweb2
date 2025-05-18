import React, {useEffect, useState} from 'react';
import Clock from "react-live-clock";
import moment from "moment/moment";
import LoadingIcon from "../LoadingIcon";

const PrayerTimeCard = () => {
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPrayer, setCurrentPrayer] = useState('Dhuhr');

    function getPrayerTimesObj(data) {
        return [
            {name: "Fajr", time: data.times[0], iqama: data.iqamaCalendar[0]["1"][0], active: false, icon: "🌄"},
            {name: "Sunrise", time: data.shuruq, iqama: "", active: false, icon: "☀️"},
            {name: "Dhuhr", time: data.times[1], iqama: data.iqamaCalendar[0]["1"][1], active: false, icon: "🕌"},
            {name: "Asr", time: data.times[2], iqama: data.iqamaCalendar[0]["1"][2], active: false, icon: "📿"},
            {name: "Maghrib", time: data.times[3], iqama: data.iqamaCalendar[0]["1"][3], active: false, icon: "🌇"},
            {name: "Isha", time: data.times[4], iqama: data.iqamaCalendar[0]["1"][4], active: false, icon: "🌃"}
        ];
    }

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('/api/v1/prayer_times/darul-ihsan-berlin/');
              const data = await response.json();
              const prayerTimesObj = getPrayerTimesObj(data);
                setPrayerTimes(prayerTimesObj);
                setLoading(false);
                localStorage.setItem("prayerTimesJson", JSON.stringify(data));
          } catch (error) {
              let prayerTimesData = localStorage.getItem("prayerTimesJson");
              const prayerTimesObj = prayerTimesData?getPrayerTimesObj(JSON.parse(prayerTimesData)): [];
              setPrayerTimes(prayerTimesObj);
              console.error("Error fetching event data:", error);
              setLoading(false);
          }
      };
      fetchData();
    }, []);

  // Sample data - replace with API calls
  /*const prayerTimes = [
    { name: 'Fajr', time: '5:30 AM', icon: '🌙' },
    { name: 'Sunrise', time: '6:45 AM', icon: '☀️' },
    { name: 'Dhuhr', time: '12:30 PM', icon: '🕌', isCurrent: true },
    { name: 'Asr', time: '3:45 PM', icon: '📿' },
    { name: 'Maghrib', time: '6:50 PM', icon: '🌆' },
    { name: 'Isha', time: '8:15 PM', icon: '🌃' }
  ];*/

  const location = {
    city: 'Berlin',
    country: 'Germany',
    hijriDate: '20 Dhul-Hijjah 1445'
  };


  return (
    <div className="bg-green-50 text-gray-700 rounded-lg overflow-hidden">
      {/* Top Section - Location & Date */}
      <div className="px-4 py-3 bg-green-50 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-2 sm:mb-0">
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-medium">{location.city}, {location.country}</span>
        </div>

        <div className="flex items-center">
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-medium">{moment(new Date()).format('dddd, MMM D YYYY')} • {new Intl.DateTimeFormat('en-TN-u-ca-islamic', {day: 'numeric', month: 'long',year : 'numeric'}).format(Date.now())}</span>
        </div>
      </div>

      {/* Prayer Times - Horizontal Scroll on Mobile */}
        <div className="px-4 py-3 overflow-x-auto">
            <div className="flex space-x-4 min-w-max justify-center md:gap-12">
                {loading && <div className="w-full px-4">
                    <LoadingIcon type="spinner" size="sm" color="green-500"/>
                </div>}
                {!loading && prayerTimes.map((prayer, index) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center rounded-lg min-w-[80px] ${
                            prayer.active ? 'bg-green-400 shadow-md' : 'bg-green-300'
                        }`}
                    >
                        <span className="text-xl mb-1">{prayer.icon}</span>
                        <span className="text-xs font-medium">{prayer.name}</span>
                        <span className={`mt-1 font-bold ${
                            prayer.active ? 'text-white' : 'text-gray-600'
                        }`}>
                            {prayer.time}
                        </span>
                        <span className="text-sm">{prayer.iqama}</span>
                        {prayer.active && (
                            <span className="mt-1 text-xs bg-white text-green-600 px-2 py-0.5 rounded-full">
                  Current
                </span>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* Current Time Footer */}
        <div className="px-4 py-2 bg-green-50 text-sm flex justify-between items-center">
            <div className="flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">
            <Clock format="HH:mm:ss" interval={1000} ticking={true}/>
          </span>
        </div>
        <span className="text-green-100">Next: Asr at 3:45 PM</span>
      </div>
    </div>
  );
};

export default PrayerTimeCard;