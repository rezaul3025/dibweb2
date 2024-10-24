import React, {Fragment} from "react";
import { useTranslation } from 'react-i18next';

export default function IdealsAndValues(){
    const { t } = useTranslation();
    return(
        <Fragment>

            <div className="container-fluid feature pb-5 py-5">
                <div className="container pb-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: '800px'}}>
                        <h4 className="text-primary"> {t('IdealsAndValues.text')}</h4>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp d-flex align-items-stretch" data-wow-delay="0.2s">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{t('IdealsAndValuesDecOneTitle.text')}</h5>
                                    <p className="card-text">{t('IdealsAndValuesDecOne.text')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp d-flex align-items-stretch"
                             data-wow-delay="0.2s">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{t('IdealsAndValuesDecTwoTitle.text')} </h5>
                                    <p className="card-text">{t('IdealsAndValuesDecTwo.text')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp d-flex align-items-stretch"
                             data-wow-delay="0.2s">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{t('IdealsAndValuesDecThreeTitle.text')} </h5>
                                    <p className="card-text">{t('IdealsAndValuesDecThree.text')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp d-flex align-items-stretch"
                             data-wow-delay="0.2s">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{t('IdealsAndValuesDecFourTitle.text')} </h5>
                                    <p className="card-text">{t('IdealsAndValuesDecFour.text')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
