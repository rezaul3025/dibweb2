import React from "react";

const PrayerTimesHeader = () => {
  const prayerTimes = [
    { name: "Fajr", time: "5:30", period: "AM", active: false, icon: "🌄" },
    { name: "Sunrise", time: "6:45", period: "AM", active: false, icon: "☀️" },
    { name: "Dhuhr", time: "12:30", period: "PM", active: true, icon: "🕌" },
    { name: "Asr", time: "3:45", period: "PM", active: false, icon: "📿" },
    { name: "Maghrib", time: "6:20", period: "PM", active: false, icon: "🌇" },
    { name: "Isha", time: "8:00", period: "PM", active: false, icon: "🌙" }
  ];

  return (
    <header className="bg-gray-50 px-4 py-3 border-b border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Date/Location - Top on mobile, left on desktop */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-800 whitespace-nowrap">
              Prayer Times
            </h2>
            <span className="hidden sm:inline-block text-sm bg-gray-200 rounded-full px-2 py-1 text-gray-700">
              📍 Berlin
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Prayer Times - Horizontal scroll on mobile, normal flex on desktop */}
        <div className="flex-1 min-w-0">
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 md:justify-center">
            {prayerTimes.map((prayer, index) => (
              <div
                key={index}
                className={`flex flex-col items-center px-3 py-2 rounded-lg min-w-[70px] flex-shrink-0 ${
                  prayer.active
                    ? "bg-green-50 border border-green-200 shadow-sm"
                    : "bg-white border border-gray-200"
                }`}
              >
                <span className="text-xs text-gray-500">{prayer.icon} {prayer.name}</span>
                <div className="flex items-baseline mt-1">
                  <span className={`text-sm font-semibold ${
                    prayer.active ? "text-green-700" : "text-gray-700"
                  }`}>
                    {prayer.time}
                  </span>
                  <span className={`text-xs ml-1 ${
                    prayer.active ? "text-green-600" : "text-gray-500"
                  }`}>
                    {prayer.period}
                  </span>
                </div>
                {prayer.active && (
                  <span className="inline-block w-2 h-2 mt-1 rounded-full bg-green-500"></span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Time - Bottom on mobile, right on desktop */}
        <div className="flex-shrink-0 flex items-center justify-end">
          <div className="flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PrayerTimesHeader;