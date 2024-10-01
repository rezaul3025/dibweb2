import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function About() {
    const { t } = useTranslation();

    return (
        <Fragment>
            <div className="nav-item dropdown">
                <a href="#" className="nav-link" data-bs-toggle="dropdown">
                    <span className="dropdown-toggle">{t('AboutUs.text')}</span>
                </a>
                <div className="dropdown-menu m-0">
                    <Link to="/history" className="dropdown-item">{t('OurHistory.text')}</Link>
                    <Link to="/goalsobjective" className="dropdown-item">{t('GoalsAndObjectives.text')}</Link>
                    <Link to="/idealsvalue" className="dropdown-item">{t('IdealsAndValues.text')}</Link>
                </div>
            </div>
        </Fragment>
    );
}
