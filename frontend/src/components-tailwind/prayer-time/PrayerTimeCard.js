import React, {Fragment, useEffect, useState} from 'react';
import Clock from "react-live-clock";
import moment from "moment/moment";
import LoadingIcon from "../LoadingIcon";

// Add custom CSS animations
const styles = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideIn {
        from {
            transform: translateX(-20px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
    }

    .animate-slideIn {
        animation: slideIn 0.5s ease-out;
    }
`;

const PrayerTimeCard = () => {
    const [prayerTimes, setPrayerTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPrayer, setNextPrayer] = useState();
    const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [progress, setProgress] = useState(0);
    const [expandedPrayer, setExpandedPrayer] = useState(null);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    const [announcementsLoading, setAnnouncementsLoading] = useState(true);

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

    // Calculate countdown to next prayer
    const calculateCountdown = (nextPrayerTime) => {
        if (!nextPrayerTime) return;

        const now = new Date();
        let [h, m] = nextPrayerTime.split(":").map(Number);
        const prayerDate = new Date();
        prayerDate.setHours(h);
        prayerDate.setMinutes(m);
        prayerDate.setSeconds(0);

        // If prayer time has passed today, set it for tomorrow
        if (prayerDate < now) {
            prayerDate.setDate(prayerDate.getDate() + 1);
        }

        const diff = prayerDate - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown({ hours, minutes, seconds });

        // Calculate progress (percentage of time passed between current and next prayer)
        const totalDayMinutes = 24 * 60;
        const minutesUntilPrayer = hours * 60 + minutes;
        const progressPercent = ((totalDayMinutes - minutesUntilPrayer) / totalDayMinutes) * 100;
        setProgress(Math.min(progressPercent, 100));
    };

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

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch('/api/v1/announcements/');
                const data = await response.json();
                setAnnouncements(data);
                setAnnouncementsLoading(false);
            } catch (error) {
                console.error("Error fetching announcements:", error);
                setAnnouncementsLoading(false);
            }
        };
        fetchAnnouncements();
    }, []);

    // Update countdown every second
    useEffect(() => {
        if (nextPrayer && nextPrayer.time) {
            calculateCountdown(nextPrayer.time);
            const interval = setInterval(() => {
                calculateCountdown(nextPrayer.time);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [nextPrayer]);

    // Handle notification permission
    const toggleNotifications = () => {
        if (!notificationsEnabled && 'Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    setNotificationsEnabled(true);
                }
            });
        } else {
            setNotificationsEnabled(false);
        }
    };

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
        <>
            <style>{styles}</style>
            <div className="bg-green-100 text-gray-500 rounded-xl overflow-hidden shadow-lg w-full mx-auto">
            {/* Top Section - Location & Date */}
            <div
                className="px-4 py-3 bg-green-100 text-sm flex flex-col sm:flex-row justify-between items-center border-b border-gray-100">
                <div className="flex items-center mb-2 sm:mb-0">
                    <svg className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span className="font-medium text-gray-700">{location.city}, {location.country}</span>
                </div>
                <div className="flex items-center">
                     {nextPrayer &&
                         <Fragment>
                             <span className="mr-1 text-2xl font-bold text-green-700">
                                 {nextPrayer.name}
                             </span>
                             <svg className="h-6 w-6 text-green-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                             </svg>
                             <span className="ml-1 text-2xl font-bold text-green-700">
                               {nextPrayer.time}
                             </span>

                         </Fragment>
                     }
                </div>

                <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <div className="md:font-medium flex items-center sm:font-normal text-gray-700">
                        <div className="px-1">{moment(new Date()).format('dddd, MMM D YYYY')}</div>
                    </div>
                </div>
            </div>

            {/* 3-Column Layout for Desktop: Timer, Prayer Times, and Announcements */}
            <div className={`flex flex-col lg:flex-row lg:divide-x lg:divide-gray-200 ${!announcementsLoading && announcements.length > 0 ? 'lg:justify-center' : 'lg:justify-around'}`}>
                {/* Countdown Timer Section - Left Column on Desktop */}
                {nextPrayer && (
                    <div className={`px-4 py-4 bg-green-100 border-b lg:border-b-0 border-gray-200 flex items-center justify-center ${!announcementsLoading && announcements.length === 0 ? 'lg:flex-1 lg:max-w-md' : 'lg:w-1/3'}`}>
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-sm font-medium text-gray-600 mb-2">Time Until {nextPrayer.name}</div>
                            <div className="flex gap-3">
                                <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                                    <div className="text-3xl font-bold text-green-700">{String(countdown.hours).padStart(2, '0')}</div>
                                    <div className="text-xs text-gray-500 text-center">Hours</div>
                                </div>
                                <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                                    <div className="text-3xl font-bold text-green-700">{String(countdown.minutes).padStart(2, '0')}</div>
                                    <div className="text-xs text-gray-500 text-center">Minutes</div>
                                </div>
                                <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                                    <div className="text-3xl font-bold text-green-700">{String(countdown.seconds).padStart(2, '0')}</div>
                                    <div className="text-xs text-gray-500 text-center">Seconds</div>
                                </div>
                            </div>
                            {/* Progress Bar */}
                            <div className="w-full mt-4">
                                <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-1000 ease-linear"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Prayer Times - Middle Column on Desktop */}
                <div className={`py-4 bg-green-100 overflow-x-auto lg:overflow-x-hidden scroll-smooth border-b lg:border-b-0 border-gray-200 ${!announcementsLoading && announcements.length === 0 ? 'lg:flex-1 lg:max-w-3xl' : 'lg:w-1/3'}`}>
                    <div className={`flex min-w-max px-4 pr-8 space-x-3 ${!announcementsLoading && announcements.length === 0 ? 'lg:min-w-0 lg:w-full lg:gap-3 lg:space-x-0 lg:px-4' : 'lg:min-w-0 lg:w-full lg:gap-2 lg:space-x-0 lg:px-2'}`}>
                        {loading && <div className="w-full px-4">
                            <LoadingIcon type="spinner" size="sm" color="green-500"/>
                        </div>}
                        {!loading && prayerTimes.map((prayer, index) => (
                            <div
                                key={index}
                                onClick={() => setExpandedPrayer(expandedPrayer === index ? null : index)}
                                className={`
                                    flex flex-col items-center rounded-xl min-w-[85px] lg:min-w-0 lg:flex-1 p-2
                                    transition-all duration-300 ease-in-out cursor-pointer
                                    transform hover:scale-105 hover:shadow-xl
                                    ${!announcementsLoading && announcements.length === 0 ? 'lg:p-3' : 'lg:p-1.5'}
                                    ${nextPrayer && nextPrayer.name === prayer.name
                                        ? 'bg-green-400 text-white shadow-xl ring-2 lg:ring-3 ring-green-500 ring-offset-1 lg:scale-105'
                                        : 'bg-green-300 hover:bg-green-400 shadow-md'
                                    }
                                    ${expandedPrayer === index ? 'scale-105 shadow-2xl' : ''}
                                `}
                            >
                                <span className={`mb-1 transition-transform duration-300 ${expandedPrayer === index ? 'scale-125' : ''} ${!announcementsLoading && announcements.length === 0 ? 'text-3xl' : 'text-xl lg:text-2xl'}`}>
                                    {prayer.icon}
                                </span>
                                <span className={`font-semibold ${!announcementsLoading && announcements.length === 0 ? 'text-sm' : 'text-xs'} ${
                                    nextPrayer && nextPrayer.name === prayer.name ? 'text-white' : 'text-gray-700'
                                }`}>
                                    {prayer.name}
                                </span>
                                <span className={`mt-1 font-bold ${!announcementsLoading && announcements.length === 0 ? 'text-base' : 'text-xs lg:text-sm'} ${
                                    nextPrayer && nextPrayer.name === prayer.name ? 'text-white' : 'text-green-700'
                                }`}>
                                    {prayer.time}
                                </span>

                                {/* Expanded Details */}
                                {expandedPrayer === index && prayer.iqama && (
                                    <div className="mt-1 pt-1 border-t border-gray-200 w-full text-center animate-fadeIn">
                                        <div className={`text-xs ${
                                            nextPrayer && nextPrayer.name === prayer.name ? 'text-white/90' : 'text-gray-500'
                                        }`}>
                                            Iqama
                                        </div>
                                        <div className={`text-xs lg:text-sm font-semibold ${
                                            nextPrayer && nextPrayer.name === prayer.name ? 'text-white' : 'text-gray-700'
                                        }`}>
                                            {prayer.iqama}
                                        </div>
                                    </div>
                                )}

                                {nextPrayer && nextPrayer.name === prayer.name && (
                                    <span className="mt-1 text-xs bg-white text-green-600 px-2 py-0.5 rounded-full font-medium shadow-md animate-pulse">
                                        Next
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Announcements Feed - Right Column on Desktop - Only show if there are announcements */}
                {!announcementsLoading && announcements.length > 0 && (
                    <div className="px-4 py-4 bg-green-100 lg:w-1/3 flex flex-col">
                        <div
                            className="space-y-3 pr-2"
                            style={announcements.length > 2 ? {
                                maxHeight: '320px',
                                overflowY: 'auto',
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#10b981 #e5e7eb'
                            } : {}}
                        >
                            {announcements.map((announcement) => (
                                <div
                                    key={announcement.id}
                                    className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow duration-300 animate-slideIn"
                                >
                                    <div className="flex gap-2">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-green-700 text-sm">{announcement.title}</h4>
                                                {announcement.date && (
                                                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                                        {moment(announcement.date).format('MMM D')}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs font-semibold text-gray-600 mb-1">{announcement.sub_title}</p>
                                            <div className="text-xs text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{__html: announcement.description}}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Current Time Footer */}
            <div className="px-4 py-3 bg-green-100 text-sm flex flex-wrap justify-between items-center border-t border-gray-200 gap-2">
                <div className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span className="font-semibold text-lg text-green-700">
                        <Clock format="HH:mm:ss" interval={1000} ticking={true}/>
                    </span>
                </div>

                {/* Notification Toggle Button */}
                <button
                    onClick={toggleNotifications}
                    className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                        transition-all duration-300 transform hover:scale-105
                        ${notificationsEnabled
                            ? 'bg-green-600 text-white shadow-md hover:bg-green-700'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }
                    `}
                    title={notificationsEnabled ? 'Notifications enabled' : 'Enable notifications'}
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                    </svg>
                    <span className="hidden sm:inline">
                        {notificationsEnabled ? 'Notifications On' : 'Notify Me'}
                    </span>
                </button>

                <div className="flex items-center text-gray-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 mr-1"
                    >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                    <a
                        className="text-green-600 hover:text-green-800 font-medium transition-colors duration-200"
                        href="https://mawaqit.net/en/darul-ihsan-berlin/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        www.mawaqit.net
                    </a>
                </div>
            </div>
        </div>
        </>
    );
};

export default PrayerTimeCard;