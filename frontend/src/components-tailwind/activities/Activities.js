import React, {Fragment} from "react";
import moment from "moment";
import {useTranslation} from "react-i18next";

export default function Activities({event}) {
    function HtmlRenderer({htmlContent}) {
        return <div dangerouslySetInnerHTML={{__html: htmlContent}}/>;
    }

    const { t } = useTranslation();

    return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3 space-y-6">
          {/* Event Heading */}
          <div>
            <h1 className="text-xl font-bold text-green-500">{event.title}</h1>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-1 bg-blue-100 text-green-500 text-xs rounded-full">Study</span>
              <span className="px-2 py-1 bg-purple-100 text-green-500 text-xs rounded-full">Quran</span>
            </div>
          </div>

          {/* Event Description */}
          <div className="prose">
            <p className="text-gray-500 text-justify break-words">
                 <HtmlRenderer htmlContent={event.description}/>
            </p>
            {/*<ul className="mt-4 space-y-2 text-gray-500">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>15+ keynote speakers</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Interactive workshops</span>
              </li>
            </ul>*/}
          </div>

          {/* Date & Time */}
          {event.event_datetime && <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-3">{t('ActivityDetails.date_time_heading')}</h2>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                  { event.event_datetime_text && <p className="text-gray-500">{event.event_datetime_text}</p>}
                  { !event.event_datetime_text && <p className="text-gray-500">{moment(event.event_datetime).format("LLL")}</p>}
              </div>
            </div>
          </div>}

          {/* Location */}
          {event.address && <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-3">{t('ActivityDetails.location_heading')}</h2>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500">{event.address}</p>
                <a href={event.map_location} target="_blank" className="text-green-500 text-sm mt-1 inline-block">{t('ActivityDetails.view_on_google_map')}</a>
              </div>
            </div>
          </div>}
        </div>

        {/* Side Thumbnail */}
        {event.poster_image && <div className="lg:w-1/3">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg sticky top-6">
            <img
              src={event.poster_image+'?auto=format&fit=crop&w=600&q=80'}
              alt="Event"
              className="w-full h-full object-cover"
            />
              {/*<div className="p-4">
              <h3 className="font-bold text-lg mb-3">Ticket Options</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>General Admission</span>
                  <span className="font-bold">$299</span>
                </div>
                <div className="flex justify-between">
                  <span>VIP Pass</span>
                  <span className="font-bold">$599</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium">
                Register Now
              </button>
            </div>
            */}
          </div>
        </div>}
      </div>
    </div>
  );
}