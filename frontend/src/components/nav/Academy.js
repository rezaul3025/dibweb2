import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Academy(){
    const { t } = useTranslation();
    return (
        <div className="nav-item dropdown">
            <a href="#" className={`nav-link ${location.pathname === "#" ? "active" : ""}`} data-bs-toggle="dropdown">
                <span className="dropdown-toggle">{t('Academy.text')}</span>
            </a>
            <div className="dropdown-menu m-0">
                <Link to="/notice-board/"
                      className={`dropdown-item ${location.pathname === "/notice-board/" ? "active" : ""}`}>{t('NoticeBoard.text')}</Link>
                <Link to="/students/"
                      className={`dropdown-item ${location.pathname === "/students/" ? "active" : ""}`}>{t('Students.text')}</Link>
            </div>
        </div>
    )
}