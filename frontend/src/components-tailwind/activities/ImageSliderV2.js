import React, {useEffect, useState} from 'react';
import {FiChevronLeft, FiChevronRight, FiExternalLink} from 'react-icons/fi';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const ImageSliderV2 = ({
                           events,
                           autoPlay = true,
                           interval = 5000,
                       }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    events = events.filter(function (event) {
    return event.event_type === 'CURRENT';
    });

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? events.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === events.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (!autoPlay) return;

        const timer = setInterval(() => {
            goToNext();
        }, interval);

        return () => clearInterval(timer);
    }, [currentIndex, autoPlay, interval]);

    function HtmlRenderer({htmlContent}) {
        return <div dangerouslySetInnerHTML={{__html: htmlContent}}/>;
    }

    const {t} = useTranslation();

    return (
        <div className="relative w-full mx-auto overflow-hidden rounded-lg shadow-lg">
            {/* Slider container */}
            <div className="relative h-64 sm:h-86 md:h-96 lg:h-[32rem]">
                {/* Slides */}
                {events.map((event, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 flex items-center ${
                            index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    >
                        {/* Background image */}
                        <img
                            src={'/static/assets'+event.poster_image}
                            alt=' '
                            className="absolute inset-0 object-cover w-full h-full"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40"></div>

                        {/* Content */}
                        <div className="relative p-6 text-white max-w-2xl ml-4 sm:ml-8 md:ml-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
                                {event.title}
                            </h2>
                            {event.description && (
                                <div className="text-sm sm:text-base mb-4 text-white/90 drop-shadow-md line-clamp-3" >
                                    <HtmlRenderer htmlContent={event.description}/>
                                </div>
                            )}
                            {event.id && (
                                <Link
                                    to={"/activity-details/" + event.id + "/"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors group"
                                >
                                    {t('view_details')}
                                    <FiExternalLink className="ml-2 group-hover:translate-x-1 transition-transform"/>
                                </Link>
                            )}
                        </div>
                    </div>
                ))}

                {/* Navigation arrows */}
                <button
                    onClick={goToPrevious}
                    className="absolute z-10 left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-green-500 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110"
                    aria-label="Previous slide"
                >
                    <FiChevronLeft size={28}/>
                </button>
                <button
                    onClick={goToNext}
                    className="absolute z-10 right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-green-500 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110"
                    aria-label="Next slide"
                >
                    <FiChevronRight size={28}/>
                </button>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                    {events.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 z-30 rounded-full transition-all ${
                                index === currentIndex
                                    ? 'bg-green-500 w-8'
                                    : 'bg-white/50 hover:bg-white/80 w-3'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageSliderV2;