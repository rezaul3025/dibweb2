import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {  useLocation } from "react-router-dom";

export default function About() {
    const { t } = useTranslation();

    return (
        <Fragment>
            <div className="nav-item dropdown">
                <a href="#" className={`nav-link ${location.pathname === "#" ? "active" : ""}`} data-bs-toggle="dropdown">
                    <span className="dropdown-toggle">{t('AboutUs.text')}</span>
                </a>
                <div className="dropdown-menu m-0">
                    <Link to="/history/" className={`dropdown-item ${location.pathname === "/history/" ? "active" : ""}`} >{t('OurHistory.text')}</Link>
                    <Link to="/goalsobjective/" className={`dropdown-item ${location.pathname === "/goalsobjective/" ? "active" : ""}`} >{t('GoalsAndObjectives.text')}</Link>
                    <Link to="/idealsvalue/" className={`dropdown-item ${location.pathname === "/idealsvalue/" ? "active" : ""}`} >{t('IdealsAndValues.text')}</Link>
                </div>
            </div>
        </Fragment>
    );
}
