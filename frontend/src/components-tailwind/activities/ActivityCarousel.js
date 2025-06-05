import React, {Fragment} from "react";
import Carousel from "./Carousel";

export default function ActivityCarousel() {

    const slides = [
    <div className="h-64 bg-blue-500 flex items-center justify-center text-white text-2xl">Slide 1</div>,
    <div className="h-64 bg-green-500 flex items-center justify-center text-white text-2xl">Slide 2</div>,
    <div className="h-64 bg-purple-500 flex items-center justify-center text-white text-2xl">Slide 3</div>,
  ];


    return (
        <Fragment>

            <Carousel items={slides} autoPlay={true} interval={5000} />

            <div id="default-carousel" className="relative w-full" data-carousel="slide">
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">

                    <div
                        className="duration-700 ease-in-out absolute inset-0 transition-transform transform z-30 -translate-x-full z-10 "
                        data-carousel-item="">
                        <img src={'/static/assets/img/carousel/image1.png'}
                             className="relative block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                             alt="..."/>
                    </div>

                    <div
                        className="duration-700 ease-in-out absolute inset-0 transition-transform transform z-30 -translate-x-full z-10 "
                        data-carousel-item="">
                        <img src={'/static/assets/img/carousel/image2.png'}
                             className="relative block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                             alt="..."/>
                    </div>

                    <div
                        className="duration-700 ease-in-out absolute inset-0 transition-transform transform z-30 -translate-x-full z-10"
                        data-carousel-item="">
                        <img src={'/static/assets/img/carousel/image3.png'}
                             className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                             alt="..."/>
                    </div>

                    <div
                        className="duration-700 ease-in-out absolute inset-0 transition-transform transform z-20 translate-x-0 z-30"
                        data-carousel-item="">
                        <img src={'/static/assets/img/carousel/image4.png'}
                             className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                             alt="..."/>
                    </div>

                    <div
                        className="duration-700 ease-in-out absolute inset-0 transition-transform transform z-10 translate-x-full z-20"
                        data-carousel-item="">
                        <img src={'/static/assets/img/carousel/image5.png'}
                             className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                             alt="..."/>
                    </div>
                </div>

                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                    <button type="button"
                            className="w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
                            aria-current="false" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                    <button type="button"
                            className="w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
                            aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                    <button type="button"
                            className="w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
                            aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                    <button type="button" className="w-3 h-3 rounded-full bg-white dark:bg-gray-800" aria-current="true"
                            aria-label="Slide 4" data-carousel-slide-to="3"></button>
                    <button type="button"
                            className="w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
                            aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                </div>

                <button type="button"
                        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        data-carousel-prev="">
        <span
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 1 1 5l4 4"></path>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
                </button>
                <button type="button"
                        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        data-carousel-next="">
        <span
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 9 4-4-4-4"></path>
            </svg>
            <span className="sr-only">Next</span>
        </span>
                </button>
            </div>

<div data-hs-carousel='{
    "loadingClasses": "opacity-0",
    "dotsItemClasses": "hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-blue-500 dark:hs-carousel-active:border-blue-500",
    "isAutoPlay": true
  }' class="relative">
  <div class="hs-carousel relative overflow-hidden w-full min-h-96 bg-white rounded-lg">
    <div class="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
      <div class="hs-carousel-slide">
        <div class="flex justify-center h-full bg-gray-100 p-6 dark:bg-neutral-900">
          <span class="self-center text-4xl text-gray-800 transition duration-700 dark:text-white">First slide</span>
        </div>
      </div>
      <div class="hs-carousel-slide">
          <div class="flex justify-center h-full bg-gray-200 p-6 dark:bg-neutral-800">
              <span
                  className="self-center text-4xl text-gray-800 transition duration-700 dark:text-white">Second slide</span>
              <span
                  className="self-center text-2xl text-gray-800 transition duration-700 dark:text-white">Second slide</span>
          </div>
      </div>
        <div class="hs-carousel-slide">
            <div class="flex justify-center h-full bg-gray-300 p-6 dark:bg-neutral-700">
          <span class="self-center text-4xl text-gray-800 transition duration-700 dark:text-white">Third slide</span>
        </div>
      </div>
    </div>
  </div>

  <button type="button" class="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-11.5 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-hidden focus:bg-gray-800/10 rounded-s-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
    <span class="text-2xl" aria-hidden="true">
      <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6"></path>
      </svg>
    </span>
    <span class="sr-only">Previous</span>
  </button>
  <button type="button" class="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-11.5 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-hidden focus:bg-gray-800/10 rounded-e-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
    <span class="sr-only">Next</span>
    <span class="text-2xl" aria-hidden="true">
      <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6"></path>
      </svg>
    </span>
  </button>

  <div class="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 flex gap-x-2"></div>
</div>


        </Fragment>
    )
}