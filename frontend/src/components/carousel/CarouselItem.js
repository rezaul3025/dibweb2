import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import moment from "moment";
import Clock from "react-live-clock";


export default function CarouselItem(props){
    const {t} = useTranslation();
    const [prayerTimes, setPrayerTimes] = useState(null);
    useEffect(() => {
        fetch('/api/v1/prayer_times/darul-ihsan-berlin/')
            .then(response => response.json())
            .then(data => {
                setPrayerTimes(data);
            }).catch(error => {
            console.log(error);
        });

    }, []);
    //'dddd, MMM D YYYY, HH:mm'
    return (
        <div className="header-carousel-item">
            <img src={props.imagePath} className="img-fluid w-100" alt={props.imageAlt}/>
            <div className="carousel-caption d-flex align-items-center">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-12 animated fadeInUp">
                            <div className="text-center">
                                {prayerTimes && <div className="row g-5">
                                    <div className="col-md-6 col-lg-6 col-xl-6 align-bottom">
                                            <h4 className="text-primary text-uppercase fw-bold mb-4">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h4>
                                            <h6 className="display-6 text-white mb-4">“Whoever builds a mosque for Allah, Allah will build for him a house like it in Paradise.”</h6>
                                            <p className="mb-5 fs-5">Source: Ṣaḥīḥ al-Bukhārī 450, Ṣaḥīḥ Muslim 533</p>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-xl-6">
                                        <h4 className="display-4 text-white mt-5">
                                            <Clock format="HH:mm:ss" interval={1000} ticking={true}/>
                                        </h4>
                                        <h4 className="text-white">{moment(new Date()).format('dddd, MMM D YYYY')}</h4>
                                        <div className="row">
                                            <div className="col-lg-4 col-6">
                                                <p className="prayer-time-thm rounded py-2 px-3">
                                                    <p className="text-white">Fajr</p>
                                                    <h2 className="text-primary">{prayerTimes.times[0]}</h2>
                                                    <h4 className="text-white">{prayerTimes.iqamaCalendar[0]["1"][0]}</h4>
                                                </p>
                                            </div>
                                            <div className="col-lg-4 col-6">
                                                <p className="prayer-time-thm rounded py-2 px-3">
                                                    <p className="text-white">Dhuhr</p>
                                                    <h2 className="text-primary">{prayerTimes.times[1]}</h2>
                                                    <h4 className="text-white">{prayerTimes.iqamaCalendar[0]["1"][1]}</h4>
                                                </p>
                                            </div>
                                            <div className="col-lg-4 col-6">
                                                <p className="prayer-time-thm rounded py-2 px-3">
                                                    <p className="text-white">Asr</p>
                                                    <h2 className="text-primary">{prayerTimes.times[2]}</h2>
                                                    <h4 className="text-white">{prayerTimes.iqamaCalendar[0]["1"][2]}</h4>
                                                </p>
                                            </div>
                                            <div className="col-lg-4 col-6">
                                                <p className="prayer-time-thm rounded py-2 px-3">
                                                    <p className="text-white">Maghrib</p>
                                                    <h2 className="text-primary">{prayerTimes.times[3]}</h2>
                                                    <h4 className="text-white">{prayerTimes.iqamaCalendar[0]["1"][3]}</h4>
                                                </p>
                                            </div>
                                            <div className="col-lg-4 col-6">
                                                <p className="prayer-time-thm rounded py-2 px-3">
                                                    <p className="text-white">Isha</p>
                                                    <h2 className="text-primary">{prayerTimes.times[4]}</h2>
                                                    <h4 className="text-white">{prayerTimes.iqamaCalendar[0]["1"][4]}</h4>
                                                </p>
                                            </div>
                                            <div className="col-lg-4 col-6">
                                                <p className="prayer-time-thm rounded py-2 px-3">
                                                    <p className="text-white">Jumua</p>
                                                    <h2 className="text-primary">{prayerTimes.jumua}</h2>
                                                    <hr/>
                                                    <h2 className="text-primary">{prayerTimes.jumua2}</h2>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                                <div className="d-flex justify-content-center flex-shrink-0 mb-4">
                                    <Link to={"/donation/"}
                                          className="btn btn-primary rounded-pill py-3 px-4 px-md-5 me-2">
                                        Donate
                                    </Link>

                                    <a
                                        href="https://www.facebook.com/profile.php?id=100068090377582"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary rounded-pill py-3 px-4 px-md-5 me-2">
                                        Follow us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}