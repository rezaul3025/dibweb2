import React  from "react";
import PrayerTimeBlock from "./PrayerTimeBlock";

const PrayerTime = () => {
  const events = [
    {
      time: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      title: "Team Standup",
      description: "Daily alignment meeting",
      isActive: true
    },
    {
      time: new Date(Date.now() + 10800000).toISOString(), // 3 hours from now
      title: "Client Review",
      description: "Project demo with ACME Corp"
    },
    {
      time: new Date(Date.now() + 18000000).toISOString(), // 5 hours from now
      title: "Lunch Break",
      isActive: false
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden max-w-md">
      <div className="bg-green-500 px-4 py-3">
        <h2 className="text-lg font-semibold text-white">Today's Schedule</h2>
        <p className="text-green-100 text-sm mt-1">
          {new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {events.map((event, index) => (
          <PrayerTimeBlock
            key={index}
            time={event.time}
            title={event.title}
            description={event.description}
            isActive={event.isActive}
          />
        ))}
      </div>
    </div>
  );
};

export default PrayerTime;