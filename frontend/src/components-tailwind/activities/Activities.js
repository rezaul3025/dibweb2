import React, {Fragment} from "react";
import ActivityCarousel from "./ActivityCarousel";

export default function Activities() {
    return (
        <Fragment>
            <section className="bg-white dark:bg-gray-900">
                <div className="max-w-screen-xl pt-20 lg:pt-28 px-4 pb-8 mx-auto lg:pb-16">
                    <div className="items-center gap-4 lg:grid lg:grid-cols-4 xl:gap-8">
                        <div className="text-gray-500 col-span-3 sm:text-lg dark:text-gray-400">
                            <h1>Current Activities</h1>
                            <ActivityCarousel/>
                        </div>
                        <div
                            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 h-56 md:h-96">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy
                                    technology acquisitions 2021</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest
                                enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>

                        </div>

                    </div>
                </div>
            </section>
        </Fragment>
    )
}