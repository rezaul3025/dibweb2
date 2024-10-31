import React, {Fragment} from "react";
import {useTranslation} from 'react-i18next';

export default function OurHistory() {
    const {t} = useTranslation();

    return (
        <Fragment>
            <div className="container-fluid about py-5" style={{overflow: 'hidden', padding: 0}}>
                <div className="container">
                    <div className="row g-0 align-items-center"> {/* Use g-0 to remove gutters */}
                        <div className="col-xl-12 wow fadeInLeft" data-wow-delay="0.2s">
                            <div>
                                <h4 className="text-primary py-4">{t('OurHistory.text')}</h4>
                                <h2 className="display-5 mb-4"><sup><i className="fas fa-quote-left text-primary"></i>
                                </sup> {t('OurHistorySubheader.text')}
                                    <sup><i className="fas fa-quote-right text-primary"></i> </sup>
                                </h2>
                                {/* Row for Each Section */}
                                <div className="row g-0"> {/* Use g-0 here too */}
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="fa-regular fa-circle-check fa-2x text-primary"></i>
                                            <p className="ms-4 lead">{t('OurHistoryDecOne.text')}</p>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="fa-regular fa-circle-check fa-2x text-primary"></i>
                                            <p className="ms-4 lead">{t('OurHistoryDecTwo.text')}</p>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="fa-regular fa-circle-check fa-2x text-primary"></i>
                                            <p className="ms-4 lead">{t('OurHistoryDecThree.text')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
