import React, { Fragment } from "react";
import { useTranslation } from 'react-i18next';

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
                    <div className="row g-5 align-items-center">
                        <div className="col-xl-5 wow fadeInLeft" data-wow-delay="0.2s">
                            <div className="nav nav-pills bg-light rounded p-5">
                                <a className="accordion-link p-4 active mb-4" data-bs-toggle="pill" href="#collapseOne">
                                    <h5 className="mb-0">{t('GoalsAndObjectivesDecTwoTitle.text')}</h5>
                                </a>
                                <a className="accordion-link p-4 mb-4" data-bs-toggle="pill" href="#collapseTwo">
                                    <h5 className="mb-0">{t('GoalsAndObjectivesDecThreeTitle.text')}</h5>
                                </a>
                                <a className="accordion-link p-4 mb-4" data-bs-toggle="pill" href="#collapseThree">
                                    <h5 className="mb-0">{t('GoalsAndObjectivesDecFourTitle.text')}</h5>
                                </a>
                                <a className="accordion-link p-4 mb-4" data-bs-toggle="pill" href="#collapseThree">
                                    <h5 className="mb-0">{t('GoalsAndObjectivesDecFiveTitle.text')}</h5>
                                </a>
                            </div>
                        </div>

                        <div class="col-xl-7 wow fadeInRight" data-wow-delay="0.4s">
                        <div class="tab-content">
                            <div id="collapseOne" class="tab-pane fade show p-0 active">
                                <div class="row g-4">
                                    <div class="col-md-10">
                                        <p class="mb-4"> {t('GoalsAndObjectivesDecTwo.text')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div id="collapseTwo" class="tab-pane fade show p-0">
                                <div class="row g-4">
                                    <div class="col-md-10">
                                        <p class="mb-4"> {t('GoalsAndObjectivesDecThree.text')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div id="collapseThree" class="tab-pane fade show p-0">
                                <div class="row g-4">
                                    <div class="col-md-10">
                                        <p class="mb-4">{t('GoalsAndObjectivesDecFour.text')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div id="collapseFour" class="tab-pane fade show p-0">
                                <div class="row g-4">
                                    <div class="col-md-10">
                                        <p class="mb-4">{t('GoalsAndObjectivesDecFive.text')}
                                        </p>
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
