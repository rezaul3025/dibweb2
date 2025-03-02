import React, { Fragment } from "react";
import { useTranslation } from 'react-i18next';

export default function DIBVision() {
    const { t } = useTranslation();

    return (
        <Fragment>
            <div className="container-fluid about" style={{ overflow: 'hidden', padding: 0 }}>
                <div className="container py-5">
                    <div className="row g-0 align-items-center">
                        <div className="col-xl-12 wow fadeInLeft" data-wow-delay="0.2s">
                            <div>
                                <div className="text-center mx-auto pb-4 wow fadeInUp" data-wow-delay="0.2s"
                                     style={{ maxWidth: '800px' }}>
                                    <h4 className="text-primary"> {t('DIBVision.text')}</h4>
                                </div>
                                <div className="row g-0">
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-bookmark-heart-fill fa-2x text-primary"></i>
                                            <p className="ms-4 lead">{t('DIBVisionDecOne.text')}</p>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-bookmark-heart-fill fa-2x text-primary"></i>
                                            <p className="ms-4 lead">{t('DIBVisionDecTwo.text')}</p>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-bookmark-heart-fill fa-2x text-primary"></i>
                                            <p className="ms-4 lead">{t('DIBVisionDecThree.text')}</p>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-bookmark-heart-fill fa-2x text-primary"></i>
                                            <p className="ms-4 lead">{t('DIBVisionDecFour.text')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-5">
                                    <div className="row">
                                        <div className="col-md-auto d-grid gap-2 d-md-block">
                                            <a className="btn btn-primary rounded-pill py-3 px-4 px-md-5 mx-2 mb-2"
                                               href="/donation/">
                                                Please donate
                                            </a>
                                        </div>
                                        <div className="col-md-auto d-grid gap-2 d-md-block">
                                            <a className="btn btn-primary rounded-pill py-3 px-4 px-md-5 mx-2 mb-2"
                                               href="/newmember/">
                                                {t('BecomeAMember.text')}
                                            </a>
                                        </div>
                                        <div className="col-md-auto d-grid gap-2 d-md-block">
                                            <a
                                                className="btn btn-primary rounded-pill py-3 px-4 px-md-5 mx-2"
                                                href="/static/assets/DarulIhsan(Bangla).pdf"
                                                download="DIB_Brochure.pdf"
                                            >
                                                Download Brochure
                                            </a>
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
