import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import Language from "./Language";
import { useTranslation } from 'react-i18next';
import About from "./About";
import {  useLocation } from "react-router-dom";

export default function Navbar(){
    const { t } = useTranslation();

    return(
            <Fragment>
                {/* Navbar & Hero Start */}
                <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                    <a href="/" className="navbar-brand p-0">
                        <h2 className="text-primary">  <img src={'/static/assets/images/dib-logo-new.png'} alt="Logo"/> &nbsp;Darul Ihsan Berlin e.V</h2>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="fa fa-bars"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto py-0">
                            <a href={'/'} className={`nav-item nav-link ${location.pathname === "/" ? "active" : ""}`}>{t('Home.text')}
                            </a>
                            <About/>
                            <Link to={"/activities/"} className={`nav-item nav-link ${location.pathname === "/activities/" ? "active" : ""}`}>{t('Activities.text')}</Link>
                             <Link to={"/dibvision/"} className={`nav-item nav-link ${location.pathname === "/dibvision/" ? "active" : ""}`}>{t('DIBVision.text')}</Link>
                            <Link to={"/donation/"} className={`nav-item nav-link ${location.pathname === "/donation/" ? "active" : ""}`}>{t('Donation.text')}</Link>
                            <Link to={"/prayer-time/"} className={`nav-item nav-link ${location.pathname === "/prayer-time/" ? "active" : ""}`}>{t('PrayerTime.text')}</Link>
                            <Link to={"/event/"} className={`nav-item nav-link ${location.pathname === "/event/" ? "active" : ""}`}>Event</Link>
                            <Link to={"/contact/"} className={`nav-item nav-link ${location.pathname === "/contact/" ? "active" : ""}`}>{t('ContactUs.text')}</Link>
                            <Language/>
                        </div>
                    </div>
                </nav>
                {/* Navbar & Hero End */}
            </Fragment>
        );
}