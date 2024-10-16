import React, { Fragment } from "react";
import { useTranslation } from 'react-i18next';

export default function Activities() {
    const { t } = useTranslation();

    const activities = [
        { title: 'ActivityOneTitle.text', content: 'ActivityOne.text' },
        { title: 'ActivityTwoTitle.text', content: 'ActivityTwo.text' },
        { title: 'ActivityThreeTitle.text', content: 'ActivityThree.text' },
        { title: 'ActivityFourTitle.text', content: 'ActivityFour.text' },
        { title: 'ActivityFiveTitle.text', content: 'ActivityFive.text' },
        { title: 'ActivitySixTitle.text', content: 'ActivitySix.text' },
        { title: 'ActivitySevenTitle.text', content: 'ActivitySeven.text' },
        { title: 'ActivityEightTitle.text', content: 'ActivityEight.text' },
        { title: 'ActivityNineTitle.text', content: 'ActivityNine.text' },
        { title: 'ActivityTenTitle.text', content: 'ActivityTen.text' },
        { title: 'ActivityElevenTitle.text', content: 'ActivityEleven.text' },
    ];

    return (
        <Fragment>
            <div className="container-fluid faq-section pb-5  py-5">
                <div className="container pb-5 overflow-hidden">
                    <div
                        className="text-center mx-auto pb-5 wow fadeInUp"
                        data-wow-delay="0.2s"
                        style={{ maxWidth: "800px" }}
                    >
                        <h4 className="text-primary"> Our Activities </h4>
                        <h1 className="display-5 mb-4"></h1>
                        <p className="mb-0 text-break">
                            {t('OurActivities.text')}
                        </p>
                    </div>
                    <div className="row g-5 align-items-center">
                    {activities.map((activity, index) => (
                            <div className="col-lg-6 wow fadeInLeft" data-wow-delay="0.2s" key={index}>
                                <div className="accordion p-2" id={`accordionFlushSection${index}`}>
                                    <div className="accordion-item rounded-top">
                                        <h2 className="accordion-header" id={`flush-heading${index}`}>
                                            <button
                                                className="accordion-button collapsed rounded-top text-primary"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#flush-collapse${index}`}
                                                aria-expanded="false"
                                                aria-controls={`flush-collapse${index}`}
                                            >
                                                 {t(activity.title)}
                                            </button>
                                        </h2>
                                        <div
                                            id={`flush-collapse${index}`}
                                            className="accordion-collapse collapse"
                                            aria-labelledby={`flush-heading${index}`}
                                            data-bs-parent={`#accordionFlushSection${index}`}
                                        >
                                            <div className="accordion-body">
                                                {t(activity.content)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </Fragment>
    );
}