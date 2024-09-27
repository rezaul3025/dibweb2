import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import Language from "./Language";
import { useTranslation } from 'react-i18next';
import About from "../About";
import AboutPage from "../pages/AboutPage";

export default function Navbar(){
    const { t } = useTranslation();
    return(
            <Fragment>
                {/* Navbar & Hero Start */}
                <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                    <a href="/" className="navbar-brand p-0">
                        <h2 className="text-primary">  <img src={'/static/assets/images/dib-logo-new.png'} alt="Logo"/> 
                        
                        </h2>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="fa fa-bars"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto py-0">
                            <a href={'/'} className={"nav-item nav-link active"}>{t('Home.text')}</a>
                            {/* <Link to={"/about"} className={"nav-item nav-link"}>{t('AboutUs.text')}</Link> */}
                            {/* <AboutPage/> */}
                            <About/>
                            <Link to={"/activities/"} className="nav-item nav-link">{t('Activities.text')}</Link>
                            <Link to={"/donation/"} className="nav-item nav-link">{t('Donation.text')}</Link>
                            <Link to={"/prayer-time/"} className="nav-item nav-link">{t('PrayerTime.text')}</Link>
                            <Link to={"/contact/"} className="nav-item nav-link">{t('ContactUs.text')}</Link>
                            <Language/>
                        </div>
                    </div>
                </nav>
                {/* Navbar & Hero End */}
            </Fragment>
        );
}