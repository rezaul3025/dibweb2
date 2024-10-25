import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function CarouselItem(props){
     const {t} = useTranslation();
    return (
        <div className="header-carousel-item">
            <img src={props.imagePath} className="img-fluid w-100" alt={props.imageAlt}/>
            <div className="carousel-caption d-flex align-items-center">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-12 animated fadeInUp">
                            <div className="text-center">
                                {/* Text Overlay */}
                                <h4 className="text-primary text-uppercase fw-bold mb-4">
                                    بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                                </h4>
                                <h4 className="text-primary fw-bold mb-4">
                                    {t('WelcomeToDarulIhsan.text')}
                                </h4>
                                <h4 className="display-4 text-white mb-4">
                                    “{props.headline}”
                                </h4>
                                <p className="mb-5 fs-5">
                                    {props.subTitle}
                                </p>

                                {/* Donation Button */}
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
                                {/* <SocialMediaLink /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}