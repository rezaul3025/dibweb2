import React, { Fragment } from "react";
import { useTranslation } from 'react-i18next';

export default function DIBVision() {
    const { t } = useTranslation();

    return (
        <Fragment>
            <div className="container-fluid about py-5" style={{ overflow: 'hidden', padding: 0 }}>
                <div className="container py-5">
                    <div className="row g-0 align-items-center"> {/* Use g-0 to remove gutters */}
                        <div className="col-xl-7 wow fadeInLeft" data-wow-delay="0.2s">
                            <div>
                                <h4 className="text-primary">{t('DIBVision.text')}</h4>
                                
                                {/* Row for Each Section */}
                                <div className="row g-0"> {/* Use g-0 here too */}
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-bookmark-star-fill fa-3x text-primary"></i>
                                            <h5 className="ms-4">{t('DIBVisionDecOne.text')}</h5>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-bookmark-star-fill fa-3x text-primary"></i>
                                            <h5 className="ms-4">{t('DIBVisionDecTwo.text')}</h5>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-bookmark-star-fill fa-3x text-primary"></i>
                                            <h5 className="ms-4">{t('DIBVisionDecThree.text')}</h5>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-bookmark-star-fill fa-3x text-primary"></i>
                                            <h5 className="ms-4">{t('DIBVisionDecFour.text')}</h5>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-bookmark-star-fill fa-3x text-primary"></i>
                                            <h5 className="ms-4">Some more texts needed .........</h5>
                                        </div>
                                    </div>
                                </div>

                                {/* Add the Please Donate Button */}
                                <div className="d-flex justify-content-center mt-5">
                                    <a className="btn btn-primary rounded-pill py-3 px-4 px-md-5 ms-2" href="/donation">
                                        Please donate
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
