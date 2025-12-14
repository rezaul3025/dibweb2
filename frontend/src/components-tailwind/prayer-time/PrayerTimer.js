import React, {Fragment, useEffect, useState} from "react";

const PrayerTimer = ({nextPayerTime}) => {

    let [h, m] = nextPayerTime.time.split(":").map(Number);
    const dateOfPrayer = new Date();
    dateOfPrayer.setMinutes(m);
    dateOfPrayer.setHours(h);

    const prayerTimeSec = Math.floor(dateOfPrayer.getTime() / 1000) - Math.floor(new Date().getTime() / 1000);
    const prayerTimeSecLocal = localStorage.getItem("prayer-time");
    if(prayerTimeSec <= 10 && (prayerTimeSecLocal == null || prayerTimeSecLocal <= 0)) {
        localStorage.setItem("prayer-time", prayerTimeSec);
    }

    const dateOfIqama =new Date();
    const iqamaMin = parseInt(nextPayerTime.iqama.substring(1));
    dateOfIqama.setMinutes(m + iqamaMin);
    dateOfIqama.setHours(h);
    const iqamaTimeSec = Math.floor(dateOfIqama.getTime() / 1000) - Math.floor(new Date().getTime() / 1000);
    const iqamaTimeSecLocal = localStorage.getItem("iqama-time");
    if((iqamaTimeSec <= 10 || iqamaTimeSec <= 5) && (iqamaTimeSecLocal == null || iqamaTimeSecLocal <= 0)) {
        localStorage.setItem("iqama-time", iqamaTimeSec);
    }



    const [timeLeft, setTimeLeft] = useState(localStorage.getItem("prayer-time"));
    const [iqamaTimeLeft, setIqamaTimeLeft] = useState(localStorage.getItem("iqama-time"));

    useEffect(() => {
        if (timeLeft <= 0) {
            return;
        }
        const interval = setInterval(() => {
            const time = timeLeft - 1;
            localStorage.setItem("prayer-time", time);
            setTimeLeft(time);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    useEffect(() => {
        if (iqamaTimeLeft <= 0) {
            return;
        }

        const interval = setInterval(() => {
            const iqamaTime = iqamaTimeLeft - 1;
            localStorage.setItem("iqama-time", iqamaTime);
            setIqamaTimeLeft(iqamaTime);
        }, 1000);

        return () => clearInterval(interval);
    }, [iqamaTimeLeft]);

    // Convert seconds → mm:ss
    const formatTime = (secs) => {
        const minutes = String(Math.floor(secs / 60)).padStart(2, "0");
        const seconds = String(secs % 60).padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const nextPrayerTime = <Fragment>
         <span className="mr-1 text-xl font-bold">
             {nextPayerTime.name}
         </span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span className="ml-1 text-xl font-bold">
           {nextPayerTime.time}
        </span>
    </Fragment>

    const payerTimeCountDown = <div className="mr-1 text-xl font-bold"> {nextPayerTime.name} In <span style={{fontFamily: "monospace"}}>
        {formatTime(timeLeft)}
    </span></div>

    const iqamaTimeCountDown = <div className="mr-1 text-xl font-bold"> {nextPayerTime.name} Iqama In <span style={{fontFamily: "monospace"}}>
        {formatTime(iqamaTimeLeft)}
    </span></div>


    return (timeLeft > 0? iqamaTimeLeft > 0 ? iqamaTimeCountDown : payerTimeCountDown :nextPrayerTime);
};

export default PrayerTimer;
