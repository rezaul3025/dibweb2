import React, { Fragment } from "react";
import { useTranslation } from 'react-i18next';

export default function OurHistory() {
    const { t } = useTranslation();

    return (
        <Fragment>
            <div className="container-fluid about py-5" style={{ overflow: 'hidden', padding: 0 }}>
                <div className="container">
                    <div className="row g-0 align-items-center"> {/* Use g-0 to remove gutters */}
                        <div className="col-xl-7 wow fadeInLeft" data-wow-delay="0.2s">
                            <div>
                                <h4 className="text-primary">{t('OurHistory.text')}</h4>
                                <h1 className="display-5 mb-4">From a Humble Dream to a Grand Vision: Growing Together by the Grace of Allah</h1>
                                
                                {/* Row for Each Section */}
                                <div className="row g-0"> {/* Use g-0 here too */}
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-bookmark-heart-fill fa-3x text-primary"></i>
                                            <p className="ms-4">{t('OurHistoryDecOne.text')}</p>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-bookmark-heart-fill fa-3x text-primary"></i>
                                            <p className="ms-4">{t('OurHistoryDecTwo.text')}</p>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-bookmark-heart-fill fa-3x text-primary"></i>
                                            <p className="ms-4">{t('OurHistoryDecThree.text')}</p>
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
