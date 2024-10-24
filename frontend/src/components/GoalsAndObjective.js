import React, { Fragment } from "react";
import { useTranslation } from 'react-i18next';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function GoalsAndObjective() {
    const { t } = useTranslation();
    console.log("Rendering component")
    return (
        <Fragment>
            <div className="container-fluid offer-section pb-5 py-5">
                <div className="container pb-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: '800px' }}>
                        <h4 className="text-primary">{t('GoalsAndObjectives.text')}</h4>
                        <p className="mb-0">{t('GoalsAndObjectivesDecOne.text')}</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp d-flex align-items-stretch"
                             data-wow-delay="0.2s">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{t('GoalsAndObjectivesDecTwoTitle.text')}</h5>
                                    <p className="card-text ">{t('GoalsAndObjectivesDecTwo.text')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp d-flex align-items-stretch"
                             data-wow-delay="0.2s">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{t('GoalsAndObjectivesDecThreeTitle.text')} </h5>
                                    <p className="card-text">{t('GoalsAndObjectivesDecThree.text')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp d-flex align-items-stretch"
                             data-wow-delay="0.2s">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{t('GoalsAndObjectivesDecFourTitle.text')} </h5>
                                    <p className="card-text">{t('GoalsAndObjectivesDecFour.text')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp d-flex align-items-stretch"
                             data-wow-delay="0.2s">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{t('GoalsAndObjectivesDecFiveTitle.text')} </h5>
                                    <p className="card-text">{t('GoalsAndObjectivesDecFive.text')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
