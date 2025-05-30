import React, {useEffect, useRef, useState} from 'react';
import {useReactToPrint} from "react-to-print";
import moment from "moment";
import {useTranslation} from "react-i18next";

const MonthlyPrayerTimetable = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getUTCFullYear());
    const [activeTab, setActiveTab] = useState('prayers');
    const [currentMonthPrayers, setCurrentMonthPrayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const componentRef = useRef();
    const { t } = useTranslation();

    // Sample prayer data - replace with your actual data
    const prayerData = [
        {
            month: 0, // January
            prayers: [
                {date: 1, fajr: '6:15 AM', dhuhr: '12:30 PM', asr: '3:00 PM', maghrib: '5:15 PM', isha: '7:30 PM'},
                {date: 2, fajr: '6:14 AM', dhuhr: '12:30 PM', asr: '3:01 PM', maghrib: '5:16 PM', isha: '7:31 PM'},
                // Add more dates...
            ]
        },
        {
            month: 1, // February
            prayers: [
                {date: 1, fajr: '5:45 AM', dhuhr: '12:15 PM', asr: '3:15 PM', maghrib: '5:30 PM', isha: '7:45 PM'},
                // Add more dates...
            ]
        },
        // Add more months...
    ];

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: `
      @page {
        size: A4;
        margin: 1cm;
      }
      @media print {
        body {
          padding: 20px;
        }
        h1 {
          color: #2c3e50 !important;
        }
      }
    `,
    });

    const fetchData = (value) => {
        setSelectedMonth(value)
        let prayerTimesCalendarData = localStorage.getItem("prayerTimesCalendarData");
        if (prayerTimesCalendarData) {
            const prayerTimesCalendarDataObj = JSON.parse(prayerTimesCalendarData)[value];
            const prayerTimesCalendarDataArr = [];
            for (let i = 1; i <= 31; i++) {
                if (prayerTimesCalendarDataObj[+i]) {
                    const date = moment(new Date(year, value, i )).format('dddd, MMM D YYYY');
                    const prayerTimesCalendarDataObjArr = [
                        ...prayerTimesCalendarDataObj[+i].slice(0, 0),
                        date,
                        ...prayerTimesCalendarDataObj[+i].slice(0)
                    ];
                    prayerTimesCalendarDataArr.push(prayerTimesCalendarDataObjArr);
                }
            }
            setCurrentMonthPrayers(prayerTimesCalendarDataArr);
        }
        /* try {
             const response = await fetch('/api/v1/prayer_times/darul-ihsan-berlin/');
             const data = await response.json();
             const prayerTimesCalendarData = data.calendar;
             localStorage.setItem("prayerTimesCalendarData", JSON.stringify(prayerTimesCalendarData));
             const prayerTimesCalendarDataObj = prayerTimesCalendarData[selectedMonth];
             const prayerTimesCalendarDataArr = [];
             for(let i = 1;i<=31;i++){
               if(prayerTimesCalendarDataObj[+i]) {
                 prayerTimesCalendarDataArr.push(prayerTimesCalendarDataObj[+i]);
               }
             }
             setCurrentMonthPrayers(prayerTimesCalendarDataArr);
             setLoading(false);
             console.log(loading);
         } catch (error) {
             let prayerTimesCalendarData = localStorage.getItem("prayerTimesCalendarData");
             setCurrentMonthPrayers(prayerTimesCalendarData[selectedMonth]);
             console.error("Error fetching event data:", error);
             setLoading(false);
         }*/
    };

    useEffect(() => {
        fetchData(new Date().getMonth());
    }, []);

    return (

        <div className="mx-auto">
            <h1 className="text-3xl font-bold text-green-500 mb-6">{t('PrayerTime.heading')} {year}</h1>

            {/* Month Selector */}
            <div className="mb-6">
                <label htmlFor="month-select" className="block text-sm font-medium text-green-700 mb-2">
                    {t('PrayerTime.select_month')}:
                </label>
                <select
                    id="month-select"
                    value={selectedMonth}
                    onChange={(e) => fetchData(parseInt(e.target.value))}
                    className="block w-full md:w-64 p-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white"
                >
                    {months.map((month, index) => (
                        <option key={month} value={index}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            {/* Tabs */}
            {/*<div className="flex border-b border-green-200 mb-6">
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'prayers' ? 'text-green-600 border-b-2 border-green-500' : 'text-green-500'}`}
                    onClick={() => setActiveTab('prayers')}
                >
                    Prayer Times
                </button>
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'calendar' ? 'text-green-600 border-b-2 border-green-500' : 'text-green-500'}`}
                    onClick={() => setActiveTab('calendar')}
                >
                    Calendar View
                </button>
                <button onClick={handlePrint}>Download Prayer TimeTable</button>
            </div>*/}

            {/* Prayer Times Table */}
            {currentMonthPrayers && activeTab === 'prayers' && (
                <div className="bg-white shadow-md rounded-lg overflow-hidden  border border-green-300 mb-4" ref={componentRef}>
                    <div className="text-gary-700 p-4 items-center">
                        <h2 className="text-xl font-semibold">{months[selectedMonth]} {year}</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-green-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">{t('PrayerTime.date')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">{t('PrayerTime.fajr')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">{t('PrayerTime.sunrise')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Dhuhr</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Asr</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Maghrib</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Isha</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {currentMonthPrayers.map((prayer, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
                                    {/*<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{prayer.date}</td>*/}
                                    {prayer.map((pd, i) => <td
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pd}</td>)}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Calendar View */}
            {/*activeTab === 'calendar' && (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="bg-green-500 text-white p-4">
                        <h2 className="text-xl font-semibold">{months[selectedMonth]} Calendar View</h2>
                    </div>
                    <div className="p-4">
                        <p className="text-green-700">Calendar view would go here</p>
                    </div>
                </div>
            )*/}
        </div>
    );
};

export default MonthlyPrayerTimetable;