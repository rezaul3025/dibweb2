import React, {Fragment, useEffect, useState} from "react";
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
            <div className="carousel-caption d-flex">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-12 animated fadeInUp">
                                {prayerTimes &&
                                    <Fragment>
                                        <div className="row mt-4 mb-2">
                                            <h5 className="text-primary text-uppercase fw-bold">بِسْمِ ٱللَّٰهِ
                                                ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h5>
                                            <h5 className="text-white mb-2">“{t('HomePageHeading.text')}”</h5>
                                            <figcaption className="blockquote-footer text-white">
                                                <cite title="Source Title">{t('HomePageHeadingSource.text')}</cite>
                                            </figcaption>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-6 col-xl-5 align-self-center">
                                                <h4 className="display-4 text-white">
                                                <Clock format="HH:mm:ss" interval={1000} ticking={true}/>
                                                </h4>
                                                <h4 className="text-white">{moment(new Date()).format('dddd, MMM D YYYY')}</h4>
                                            </div>
                                            <div className="col-md-6 col-lg-6 col-xl-7">
                                                <div className="row">
                                                    <div className="col-lg-4 col-6">
                                                        <div className="prayer-time-thm rounded py-2 px-3 m-2">
                                                            <p className="text-white">Fajr</p>
                                                            <h2 className="text-primary">{prayerTimes.times[0]}</h2>
                                                            <h4 className="text-white">{prayerTimes.iqamaCalendar[0]["1"][0]}</h4>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-6">
                                                        <div className="prayer-time-thm rounded py-2 px-3 m-2">
                                                            <p className="text-white">Dhuhr</p>
                                                            <h2 className="text-primary">{prayerTimes.times[1]}</h2>
                                                            <h4 className="text-white">{prayerTimes.iqamaCalendar[0]["1"][1]}</h4>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-6">
                                                        <div className="prayer-time-thm rounded py-2 px-3 m-2">
                                                            <p className="text-white">Asr</p>
                                                            <h2 className="text-primary">{prayerTimes.times[2]}</h2>
                                                            <h4 className="text-white">{prayerTimes.iqamaCalendar[0]["1"][2]}</h4>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-6">
                                                        <div className="prayer-time-thm rounded py-2 px-3 m-2">
                                                            <p className="text-white">Maghrib</p>
                                                            <h2 className="text-primary">{prayerTimes.times[3]}</h2>
                                                            <h4 className="text-white">{prayerTimes.iqamaCalendar[0]["1"][3]}</h4>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-6">
                                                        <div className="prayer-time-thm rounded py-2 px-3 m-2">
                                                            <p className="text-white">Isha</p>
                                                            <h2 className="text-primary">{prayerTimes.times[4]}</h2>
                                                            <h4 className="text-white">{prayerTimes.iqamaCalendar[0]["1"][4]}</h4>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-6">
                                                        <div className="prayer-time-thm rounded py-2 px-3 m-2">
                                                            <p className="text-white">Jumua</p>
                                                            <h2 className="text-primary">{prayerTimes.jumua}</h2>
                                                            <hr/>
                                                            <h2 className="text-primary">{prayerTimes.jumua2}</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>}
                            <div className="d-flex justify-content-center flex-shrink-0 mb-5">
                                <div className="row">
                                    <div className="col-md-auto d-grid gap-2 d-md-block">
                                        <Link to={"/donation/"}
                                              className="btn btn-primary btn-block rounded-pill mb-2 py-3 px-4 px-md-5 me-2 align-self-center">
                                            Donate
                                        </Link>
                                    </div>
                                    <div className="col-md-auto d-grid gap-2 d-md-block">
                                        <a
                                            href="https://www.facebook.com/profile.php?id=100068090377582"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary btn-block rounded-pill mb-2 py-3 px-4 px-md-5 me-2 align-self-center">
                                            Follow us
                                        </a>
                                        </div>
                                    <div className="col-md-auto d-grid gap-2 d-md-block">
                                        <a
                                            className="btn btn-primary btn-block rounded-pill py-3 px-4 px-md-5 me-2 align-self-center"
                                            href="/static/assets/pdf/RamadanCalendar-2025.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Download Ramadan Calendar
                                        </a>
                                    </div>
                                    </div>
                                </div>
                                {/* <SocialMediaLink /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}