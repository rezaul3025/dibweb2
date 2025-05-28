import React from "react";
import {useTranslation} from "react-i18next";

const HistoryV2 = () => {
    const { t } = useTranslation();
    const timelineData = [
        {
            year: 2025,
            title: t('AboutUs.history_timeline.y_2025.title'),
            description: t('AboutUs.history_timeline.y_2025.description')
        },
        {
            year: 2024,
            title: t('AboutUs.history_timeline.y_2024.title'),
            description: t('AboutUs.history_timeline.y_2024.description')
        },
        {
            year: 2021,
            title: t('AboutUs.history_timeline.y_2021.title'),
            description: t('AboutUs.history_timeline.y_2021.description')
        },
        {
            year: 2018,
            title: t('AboutUs.history_timeline.y_2018.title'),
            description: t('AboutUs.history_timeline.y_2018.description')

        },
        {
            year: 2016,
            title: t('AboutUs.history_timeline.y_2016.title'),
            description: t('AboutUs.history_timeline.y_2016.description')
        },
        {
            year: 2015,
            title: t('AboutUs.history_timeline.y_2015.title'),
            description: t('AboutUs.history_timeline.y_2015.description')
        },
        {
            year: 2011,
            title: t('AboutUs.history_timeline.y_2011.title'),
            description: t('AboutUs.history_timeline.y_2011.description')
        }
    ];


    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    <span className="text-green-500">{t('AboutUs.history_timeline.title')}</span>
                </h2>
                <ol className="relative border-s border-gray-200 dark:border-gray-700">
                    {timelineData.map((item, index) => (<li className="mb-10 ms-4">
                        <div
                            className="absolute w-3 h-3 bg-green-500 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time
                            className="mb-1 text-md font-normal leading-none text-green-500 dark:text-gray-700">{item.year}
                        </time>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white"> {item.title}</h3>
                        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400 text-justify break-words">{item.description}</p>
                    </li>))}
                </ol>
            </div>
        </div>
    );
};

export default HistoryV2;