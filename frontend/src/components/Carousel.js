import React, {Fragment} from "react";
import {PrayerTime} from "./PrayerTime";
import {useTranslation} from "react-i18next";
import SocialMediaLink from "./SocialMediaLink";

export default function Carousel(){
     const { t } = useTranslation();
    return(
        <Fragment>
            {/* Carousel Start */}
            <div className="header-carousel owl-carousel">
                <div className="header-carousel-item">
                    <img src={'/static/assets/img/nabawi-mosque.jpg'} className="img-fluid w-100"
                         alt="Al Masjid an Nabawi"/>
                    <div className="carousel-caption">
                        <div className="container">
                            <div className="row g-5">
                                <div className="col-12 animated fadeInUp">
                                    <div className="text-center">
                                        <h4 className="text-primary text-uppercase fw-bold mb-4">{t('WelcomeToDarulIhsan.text')}</h4>
                                        <h1 className="display-4 text-uppercase text-white mb-4">“Whoever builds a
                                            mosque for Allah, Allah will build for him a house like it in
                                            Paradise.”</h1>
                                        <p className="mb-5 fs-5">Source: Ṣaḥīḥ al-Bukhārī 450, Ṣaḥīḥ Muslim
                                            533</p>
                                        <div className="d-flex justify-content-center flex-shrink-0 mb-4">
                                            <a className="btn btn-light rounded-pill py-3 px-4 px-md-5 me-2" href="#"><i
                                                className="fas fa-play-circle me-2"></i> Watch Video</a>
                                            <a className="btn btn-primary rounded-pill py-3 px-4 px-md-5 ms-2" href="#">Please
                                                donate</a>
                                        </div>
                                        <SocialMediaLink/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-carousel-item">
                    <img src={'/static/assets/img/makka-masjid-al-haram1.jpg'} className="img-fluid w-100"
                         alt="Al Masjid an Nabawi"/>
                    <div className="carousel-caption">
                        <div className="container">
                            <div className="row g-5">
                                <div className="col-12 animated fadeInUp">
                                    <div className="text-center">
                                        <h4 className="text-primary text-uppercase fw-bold mb-4">{t('WelcomeToDarulIhsan.text')}</h4>
                                        <h2 className="display-4 text-uppercase text-white mb-4">“Whoever builds a
                                            mosque for Allah, Allah will build for him a house like it in
                                            Paradise.”</h2>
                                        <p className="mb-5 fs-5">Source: Ṣaḥīḥ al-Bukhārī 450, Ṣaḥīḥ Muslim
                                            533</p>
                                        <div className="d-flex justify-content-center flex-shrink-0 mb-4">
                                            <a className="btn btn-light rounded-pill py-3 px-4 px-md-5 me-2" href="#"><i
                                                className="fas fa-play-circle me-2"></i> Watch Video</a>
                                            <a className="btn btn-primary rounded-pill py-3 px-4 px-md-5 ms-2" href="#">Please
                                                donate</a>
                                        </div>
                                        <SocialMediaLink/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-carousel-item">
                    <img src={'/static/assets/img/mecca.jpg'} className="img-fluid w-100" alt="Masjid al-Haram"/>
                    <div className="carousel-caption">
                        <div className="container">
                            <div className="row gy-0 gx-5">
                                <div className="col-lg-0 col-xl-5"></div>
                                <div className="col-xl-7 animated fadeInLeft">
                                    <div className="text-sm-center text-md-end">
                                        <PrayerTime/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Carousel End */}
        </Fragment>
    );
};