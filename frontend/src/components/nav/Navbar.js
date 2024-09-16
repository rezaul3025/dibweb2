import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import Language from "./Language";
import { useTranslation } from 'react-i18next';

export default function Navbar(){
    const { t } = useTranslation();
    return(
            <Fragment>
                {/* Navbar & Hero Start */}
                <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                    <a href="/" className="navbar-brand p-0">
                        <h2 className="text-primary">  <img src={'/static/assets/images/dib-logo-new.png'} alt="Logo"/> D I B</h2>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="fa fa-bars"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto py-0">
                            <a href={'/'} className={"nav-item nav-link active"}>{t('Home.text')}</a>
                            <a href={"/about"} className={"nav-item nav-link"}>{t('AboutUs.text')}</a>
                            <a href={"/activities"} className="nav-item nav-link">{t('Activities.text')}</a>
                            <a href={"/donation"} className="nav-item nav-link">Donation</a>
                            <a href={"/prayer-time"} className="nav-item nav-link">Prayer Time</a>
                            <a href={"/contact"} className="nav-item nav-link">{t('ContactUs.text')}</a>
                            <Language/>
                        </div>
                    </div>
                </nav>
                {/* Navbar & Hero End */}
            </Fragment>
        );
}