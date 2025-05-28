import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const EventSidebar = ({events}) => {
  events = events.filter(function (event) {
    return event.event_type === 'FUTURE';
    });
  // Sample event data
  /*const events = [
    {
      id: 1,
      title: "Team Sync Meeting",
      shortDesc: "Weekly project alignment",
      date: "2023-11-15T10:00:00",
      color: "bg-blue-100"
    },
    {
      id: 2,
      title: "Product Launch",
      shortDesc: "New feature rollout",
      date: "2023-11-17T14:30:00",
      color: "bg-purple-100"
    },
    {
      id: 3,
      title: "Client Workshop",
      shortDesc: "Requirements gathering",
      date: "2023-11-20T09:00:00",
      color: "bg-green-100"
    },
    {
      id: 4,
      title: "Retrospective",
      shortDesc: "Sprint review",
      date: "2023-11-22T16:00:00",
      color: "bg-yellow-100"
    }
  ];*/

  // Format date and time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const { t } = useTranslation();

  return (
    <div className="h-full bg-green-50 backdrop-blur-sm border-l border-gray-200/50 rounded-2xl shadow-lg">
      {/* Transparent Header */}
      <div className="top-0 px-4 py-3 border-b border-gray-200/50 rounded-t-2xl backdrop-blur-sm">
        <h3 className="text-sm font-semibold text-gray-500">{t('Home.next_event')}</h3>
      </div>

      {/* Events List */}
      <div className="overflow-y-auto h-[calc(100%-52px)]">
        {events.map((event, index) => (
         <div
            key={event.id}
            className={`px-4 py-3 border-b border-green-100 hover:bg-green-300 transition-colors ${index%2===0?'bg-blue-100':'bg-green-100'}`}
          >
            <div className="flex items-start gap-3">
              {/* Date Indicator */}
              <div className="flex flex-col items-center min-w-[40px]">
                <span className="text-xs font-medium text-gray-500">
                  {new Date(event.event_datetime).toLocaleString('default', { weekday: 'short' }).toUpperCase()}
                </span>
                <span className="text-lg font-bold text-gray-600">
                  {new Date(event.event_datetime).getDate()}
                </span>
              </div>

              {/* Event Details */}
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-500 line-clamp-1">
                  {event.title}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-1 mt-1">
                  {event.description}
                </p>
                  <div className="flex items-center gap-1 mt-1.5">
                      <svg
                          className="w-3 h-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                      >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                      </svg>
                      <span className="text-xs text-gray-500">
                    {formatDate(event.event_datetime)} • {formatTime(event.event_datetime)}
                  </span>
                      <Link to={"/activity-details/"+event.id+"/"}
                          className="text-xs font-medium text-green-600 hover:text-green-800 px-2 py-1 rounded transition-colors">
                          View Details
                      </Link>
                  </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventSidebar;