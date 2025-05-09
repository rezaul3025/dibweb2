import React from "react";
import CarouselWithSidebar from "./activities/CarouselWithSidebar";
import PrayerTimesHeader from "./prayer-time/PrayerTimesHeader";
import StickyHeader from "./header/StickyHeader";
import CarouselWithSidebarV2 from "./activities/CarouselWithSidebarV2";
import FooterV3 from "./FooterV3";
import MissionAndVision from "./mission-and-vision/MissionAndVision";
import NewMemberAnnouncementBlock from "./NewMemberAnnouncementBlock";


const HomePage = () => {
  const carouselItems = [
    <div className="h-full w-full bg-gradient-to-r from-blue-500 to-blue-300 flex items-center justify-center">
      <img src={'/static/assets/img/carousel/image1.png'}  alt=''/>
      <div className="text-center p-8">
        <h2 className="text-4xl font-bold text-white mb-4">Welcome to Our Site</h2>
        <p className="text-xl text-white mb-6">Discover amazing products and services</p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition">Learn More</button>
      </div>
    </div>,
    <div className="h-full w-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-4xl font-bold text-white mb-4">Summer Sale</h2>
        <p className="text-xl text-white mb-6">Up to 50% off on selected items</p>
        <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition">Shop Now</button>
      </div>
    </div>,
    <div className="h-full w-full bg-gradient-to-r from-green-500 to-teal-400 flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-4xl font-bold text-white mb-4">New Arrivals</h2>
        <p className="text-xl text-white mb-6">Check out our latest collection</p>
        <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition">View Collection</button>
      </div>
    </div>
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <StickyHeader />
      <main className="flex-grow">
        {/* Hero Prayer Section */}
        <section className="container mx-auto px-4 pt-4">
          <PrayerTimesHeader/>
        </section>
        {/* Hero Carousel Section */}
        <section className="container mx-auto px-4 pt-4">
          <CarouselWithSidebarV2 carouselItems={carouselItems}/>
          {/*<Carousel items={carouselItems} autoPlay={true} interval={5000} /> */}

        </section>
        <section className="mx-auto mt-4 pb-4 bg-gray-50">
          <div className="container mx-auto px-4 pt-4">
            <MissionAndVision/>
            <NewMemberAnnouncementBlock />
          </div>
        </section>

        {/* Content Section
        <section className="container mx-auto px-4 pt-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">Product {item}</h3>
                    <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">View
                      Details
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </section>
        */}
      </main>

      <FooterV3/>
    </div>
  );
};

export default HomePage;