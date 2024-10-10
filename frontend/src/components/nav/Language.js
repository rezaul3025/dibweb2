import React, {Fragment} from "react";
import i18n from 'i18next';

export default function Language(){
    const languages = [
        { code: 'en', nativeName: 'English' },
        { code: 'de', nativeName: 'Deutsch' },
        { code: 'bn', nativeName: 'বাংলা' },
    ];

    return(
        <Fragment>
            <div className="nav-item dropdown">
                <a href="#" className="nav-link" data-bs-toggle="dropdown">
                    <span className="dropdown-toggle">Language</span>
                </a>
                <div className="dropdown-menu m-0">
                    {languages.map((lng) => {
                        return (
                            <a
                                className="dropdown-item"
                                key={lng.code}
                                type="submit"
                                onClick={() => i18n.changeLanguage(lng.code)}
                            >
                                {lng.nativeName}
                            </a>
                        );
                    })}
                </div>
            </div>
        </Fragment>
    );
}