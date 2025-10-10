import React, {Fragment, useEffect, useState} from 'react';
import Clock from "react-live-clock";
import moment from "moment/moment";
import LoadingIcon from "../LoadingIcon";

const PrayerTimeCard = () => {
    const [prayerTimes, setPrayerTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPrayer, setNextPrayer] = useState()

    function getPrayerTimesObj(data) {
        const prayerTimes = [
            {name: "Fajr", time: data.times[0], iqama: data.iqamaCalendar[0]["1"][0], active: false, icon: "🌄"},
            {name: "Sunrise", time: data.shuruq, iqama: "", active: false, icon: "☀️"},
            {name: "Dhuhr", time: data.times[1], iqama: data.iqamaCalendar[0]["1"][1], active: false, icon: "🕌"},
            {name: "Asr", time: data.times[2], iqama: data.iqamaCalendar[0]["1"][2], active: false, icon: "📿"},
            {name: "Maghrib", time: data.times[3], iqama: data.iqamaCalendar[0]["1"][3], active: false, icon: "🌇"},
            {name: "Isha", time: data.times[4], iqama: data.iqamaCalendar[0]["1"][4], active: false, icon: "🌃"}
        ];

        let [h, m] = data.times[0].split(":").map(Number);
        const fajrTime = new Date().setMinutes(h * 60 + m);

        setNextPrayer(getClosestTime(prayerTimes, fajrTime));

        return prayerTimes;
    }


    function getClosestTime(timesObj, fajrTime) {
        const now = new Date();
        const nowMinutes = now.getHours() * 60 + now.getMinutes(); // convert to minutes since midnight

        let closest = {};
        let minDiff = fajrTime - now;

        timesObj.forEach(timeObj => {
            if (timeObj.name === 'Sunrise') {
                return;
            }
            // convert "HH:MM" to minutes
            let [h, m] = timeObj.time.split(":").map(Number);
            let totalMinutes = h * 60 + m;

            const dateOfPrayer = new Date();
            dateOfPrayer.setMinutes(m);
            dateOfPrayer.setHours(h);
            if(timeObj.name === 'Fajr' && now.getHours() > h){
                dateOfPrayer.setDate(dateOfPrayer.getDate() + 1);
            }
            const diffDate = Math.floor(dateOfPrayer.getTime() / 60000) - Math.floor(now.getTime() / 60000);

            // find absolute difference
            let diff = Math.abs(totalMinutes - nowMinutes);

            if (diffDate> 0 && diffDate <= minDiff) {
                minDiff = diffDate;
                closest['name'] = timeObj.name;
                closest['time'] = timeObj.time;
            }
        });

        return closest;
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
                const prayerTimesCalendarData = data.calendar;
                localStorage.setItem("prayerTimesCalendarData", JSON.stringify(prayerTimesCalendarData));
            } catch (error) {
                let prayerTimesData = localStorage.getItem("prayerTimesJson");
                const prayerTimesObj = prayerTimesData ? getPrayerTimesObj(JSON.parse(prayerTimesData)) : [];
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
        <div className="bg-green-50 text-gray-500 rounded-lg overflow-hidden">
            {/* Top Section - Location & Date */}
            <div
                className="px-4 py-3 bg-green-50 text-sm flex flex-col sm:flex-row justify-between items-center border-b border-gray-100">
                <div className="flex items-center mb-2 sm:mb-0">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span className="font-medium">{location.city}, {location.country}.</span>
                </div>
                <div className="flex items-center">
                     {nextPrayer &&
                         <Fragment>
                             <span className="mr-1 text-2xl font-bold">
                                 {nextPrayer.name}
                             </span>
                             <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                             </svg>
                             <span className="ml-1 text-2xl font-bold">
                               {nextPrayer.time}
                             </span>

                         </Fragment>
                     }
                </div>

                <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <div className="md:font-medium flex items-center sm:font-normal">
                        <div className="px-1">{moment(new Date()).format('dddd, MMM D YYYY')}</div>
                        {/*<div className="px-1">
                            {new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            }).format(Date.now())}
                        </div>*/}
                    </div>
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
                                nextPrayer && nextPrayer.name === prayer.name ? 'text-white' : 'text-gray-600'
                            }`}>
                            {prayer.time}
                        </span>
                            <span className="text-sm">{prayer.iqama}</span>
                            { nextPrayer && nextPrayer.name === prayer.name && (
                                <span className="mt-1 text-xs bg-white text-green-600 px-2 py-0.5 rounded-full mb-2">
                  Next
                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Current Time Footer */}
            <div className="px-4 py-2 bg-green-50 text-sm flex justify-between items-center border-t border-gray-100">
                <div className="flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span className="font-medium">
                    <Clock format="HH:mm:ss" interval={1000} ticking={true}/>
                    </span>

                </div>
                <div className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                    >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>

                    <a className="text-green-600 hover:text-green-800 px-2" href="https://mawaqit.net/en/darul-ihsan-berlin/"
                       target="_blank">www.mawaqit.net</a>
                </div>
            </div>
        </div>
    );
};

export default PrayerTimeCard;