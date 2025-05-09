import React, {Fragment, useEffect, useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/solid';

const ActivityCarouselV2 = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    // Format full date with weekday, month, day, year
    const fullDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const slides = [
        {
            image: "/static/assets/img/carousel/image1.png",
            title: "Nature Exploration",
            description: "Discover breathtaking landscapes and untouched wilderness in our guided tours.",
            address: "BrunnenStr 144, 12345 Berlin",
        },
        {
            image: "/static/assets/img/carousel/image2.png",
            title: "Urban Adventures",
            description: "Experience the vibrant energy of the world's most exciting cities.",
            address: "BrunnenStr 144, 12345 Berlin",
        },
        {
            image: "/static/assets/img/carousel/image3.png",
            title: "Tech Innovations",
            description: "Stay ahead with the latest technological breakthroughs and gadgets.",
            address: "BrunnenStr 144, 12345 Berlin",
        },
    ];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (!autoPlay) return;
        const timer = setTimeout(nextSlide, 5000);
        return () => clearTimeout(timer);
    }, [currentIndex, autoPlay]);

    return (
        <Fragment>
            {/* Carousel Container */}
            <div className="flex h-full transition-transform duration-700 ease-in-out"
                 style={{transform: `translateX(-${currentIndex * 100}%)`}}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0 relative">
                        {/* Image */}
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full md:h-96 object-cover"
                        />

                        {/* Text Overlay */}
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6">
                            <div className="max-w-2xl">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                    {slide.title}
                                </h3>
                                <p className="text-gray-200 mb-4 line-clamp-2">
                                    {slide.description}
                                </p>
                                <div className="flex items-start mb-6">
                                    {/* Location SVG Icon */}
                                    <svg
                                        className="h-6 w-6 text-white mr-4 flex-shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>

                                    <div>
                                        <address className="not-italic text-gray-300">
                                            <p className="mb-1">{slide.address}</p>
                                        </address>
                                    </div>
                                </div>
                                {/* Date with SVG Icon */}
                                <div className="flex items-start">
                                    {/* Calendar SVG Icon */}
                                    <svg
                                        className="h-6 w-6 text-white mr-4 flex-shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>

                                    <div>
                                        <p className="text-gray-300">{fullDate}</p>
                                    </div>
                                </div>
                                <button
                                    className="bg-green-500 text-gray-800 hover:bg-green-700 px-4 py-2 rounded-md font-medium transition">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md"
            >
                <ChevronLeftIcon className="h-5 w-5"/>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md"
            >
                <ChevronRightIcon className="h-5 w-5"/>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            currentIndex === index ? 'bg-white w-6' : 'bg-white/50'
                        }`}
                    />
                ))}
            </div>

            {/* Auto-play Toggle */}
            <button
                onClick={() => setAutoPlay(!autoPlay)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md"
            >
                {autoPlay ? (
                    <span className="text-xs font-medium">⏸</span>
                ) : (
                    <span className="text-xs font-medium">▶</span>
                )}
            </button>
        </Fragment>
    );
};

export default ActivityCarouselV2;