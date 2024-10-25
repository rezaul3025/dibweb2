import React, {Fragment, useState} from "react";
import i18n from 'i18next';
import {useTranslation} from "react-i18next";

export default function Language(){
    const { t } = useTranslation();

    const languages = [
        { code: 'en', nativeName: 'English' },
        { code: 'de', nativeName: 'Deutsch' },
        { code: 'bn', nativeName: 'বাংলা' },
    ];

    const [imageIconPath, setImageIconPath] = useState(
        localStorage.getItem("languageIcon")?localStorage.getItem("languageIcon"):
        "/static/assets/img/lang_icon/en.png")

    const changeLanguage = (code) =>{
        i18n.changeLanguage(code);
        localStorage.setItem("languageCode", code);
        localStorage.setItem("languageIcon", "/static/assets/img/lang_icon/"+code+".png");
        setImageIconPath(localStorage.getItem("languageIcon"));
    }

    return(
        <Fragment>
            <div className="nav-item dropdown">
                <a href="#" className="nav-link" data-bs-toggle="dropdown">
                    <span className="dropdown-toggle"><img width={25} height={25} src={imageIconPath} alt={imageIconPath}/> &nbsp;{t('Language.text')}</span>
                </a>
                <div className="dropdown-menu m-0">
                {languages.map((lng) => {
                        return (
                            <a
                                className="dropdown-item"
                                key={lng.code}
                                type="submit"
                                onClick={() => changeLanguage(lng.code)}
                            >
                                <img width={25} height={25} src={"/static/assets/img/lang_icon/"+lng.code+".png"} alt={lng.code}/> {lng.nativeName}
                            </a>
                        );
                })}
                </div>
            </div>
        </Fragment>
    );
}