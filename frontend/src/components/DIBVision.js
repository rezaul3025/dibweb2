import React, {Fragment} from "react";
import {useTranslation} from 'react-i18next';

export default function DIBVision() {
    const {t} = useTranslation();
    return (
        <Fragment>
            <div className="container-fluid about" style={{overflow: 'hidden', padding: 0}}>
                <div className="container py-5">
                    <div className="row g-0 align-items-center"> {/* Use g-0 to remove gutters */}
                        <div className="col-xl-12 wow fadeInLeft" data-wow-delay="0.2s">
                            <div>
                                <div className="text-center mx-auto pb-4 wow fadeInUp" data-wow-delay="0.2s"
                                     style={{maxWidth: '800px'}}>
                                    <h4 className="text-primary"> {t('DIBVision.text')}</h4>
                                </div>
                                {/* Row for Each Section */}
                                <div className="row g-0"> {/* Use g-0 here too */}
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="fa-regular fa-circle-check fa-2x text-primary"></i>
                                            <p className="ms-4 lead">{t('DIBVisionDecOne.text')}</p>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="fa-regular fa-circle-check fa-2x text-primary"></i>
                                            <p className="ms-4 lead">{t('DIBVisionDecTwo.text')}</p>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="fa-regular fa-circle-check fa-2x text-primary"></i>
                                            <p className="ms-4 lead">{t('DIBVisionDecThree.text')}</p>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="fa-regular fa-circle-check fa-2x text-primary"></i>
                                            <p className="ms-4 lead">{t('DIBVisionDecFour.text')}</p>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="fa-regular fa-circle-check fa-2x text-primary"></i>
                                            <p className="ms-4 lead">Some more texts needed .........</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Add the Please Donate Button */}
                                <div className="d-flex justify-content-center mt-5">
                                    <a className="btn btn-primary rounded-pill py-3 px-4 px-md-5 ms-2" href="/donation/">
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