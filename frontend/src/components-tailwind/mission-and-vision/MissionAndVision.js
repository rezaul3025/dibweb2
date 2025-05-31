import React from "react";
import {CheckCircleIcon} from "@heroicons/react/16/solid";
import {useTranslation} from "react-i18next";

const MissionAndVision = () => {
    const { t } = useTranslation();
    const items = [
        {
            title: t('Home.vision_heading'),
            description: t('Home.vision_sub_heading')
        },
        {
            title: t('Home.mission.title'),
            description: "",
            items: [
                {
                    title: t('Home.mission.items.title_0'),
                    description: t('Home.mission.items.description_0'),
                },
                {
                   title: t('Home.mission.items.title_1'),
                    description: t('Home.mission.items.description_1'),
                },
                {
                   title: t('Home.mission.items.title_2'),
                    description: t('Home.mission.items.description_2'),
                },
                {
                   title: t('Home.mission.items.title_3'),
                    description: t('Home.mission.items.description_3'),
                }

            ]
        },
        {
            title: t('Home.Goal.title'),
            description: t('Home.Goal.description')
        }
    ];


    return (
        <div className="mx-auto">
            {/* List Header */}
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-green-500 sm:text-4xl mb-2">{t('Home.mission_vision')}</h2>
            </div>

            {/* Content List */}
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="group p3 rounded-lg gap-3 p-3
                        dark:hover:bg-gray-800/50
                            border border-transparent hover:border-gray-200 dark:hover:border-gray-700
                                backdrop-blur-sm"
                    >
                        <div className="flex">
                            <CheckCircleIcon className="h-5 w-5 mt-1 mr-2 text-green-500"/>
                            <span className="text-xl font-medium text-gray-800 dark:text-white inline">
                                {item.title}
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mt-1 text-justify break-words">
                            {item.description}
                        </p>

                        {item.items && item.items.map((item, index) => (
                            <ul className="space-y-3" key={index}>
                                <li className="text-gray-600 dark:text-gray-300 mt-4 text-justify break-words" > <span className="font-bold">{index +1}. {item.title}  : </span> {item.description} </li>
                            </ul>
                        ))}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default MissionAndVision;