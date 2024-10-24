
import React, { Fragment } from "react";
import { PrayerTime } from "./PrayerTime";
import { useTranslation } from "react-i18next";
import SocialMediaLink from "./SocialMediaLink";
import { Link } from "react-router-dom";

export default function Carousel() {
  const { t } = useTranslation();
  
  return (
    <Fragment>
      {/* Carousel Start */}
      <div className="header-carousel owl-carousel" style={{ height: '600px', overflow: 'hidden' }}>
        <div className="header-carousel-item">
          {/* Video Background */}
          <video className="video-fluid w-100" autoPlay muted loop style={{ height: '100%', objectFit: 'cover' }}>
            <source src={'/static/assets/videos/home.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

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
                      “Whoever builds a mosque for Allah, Allah will build for him a house like it in Paradise.”
                    </h4>
                    <p className="mb-5 fs-5">
                      Source: Ṣaḥīḥ al-Bukhārī 450, Ṣaḥīḥ Muslim 533
                    </p>

                    {/* Donation Button */}
                    <div className="d-flex justify-content-center flex-shrink-0 mb-4">
                        <Link to={"/donation/"} className="btn btn-primary rounded-pill py-3 px-4 px-md-5 me-2">
                            Donate
                        </Link>

                        <a
                            href="https://www.facebook.com/profile.php?id=100068090377582"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary rounded-pill py-3 px-4 px-md-5 me-2"
                        >
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
      </div>
      {/* Carousel End */}
    </Fragment>
  );
}



