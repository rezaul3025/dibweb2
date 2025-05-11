import React from "react";
import CarouselWithSidebar from "./activities/CarouselWithSidebar";
import PrayerTimesHeader from "./prayer-time/PrayerTimesHeader";
import StickyHeader from "./header/StickyHeader";
import CarouselWithSidebarV2 from "./activities/CarouselWithSidebarV2";
import FooterV3 from "./FooterV3";
import MissionAndVision from "./mission-and-vision/MissionAndVision";
import NewMemberAnnouncementBlock from "./NewMemberAnnouncementBlock";
import PrayerTimeHeaderV2 from "./prayer-time/PrayerTimeHeaderV2";


const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <StickyHeader />
      <main className="flex-grow">
        {/* Hero Prayer Section */}
        <section className="container mx-auto px-4 pt-4">
          <PrayerTimeHeaderV2 />
        </section>
        {/* Hero Carousel Section */}
        <section className="container mx-auto px-4 pt-4">
          <CarouselWithSidebarV2 />
          {/*<Carousel items={carouselItems} autoPlay={true} interval={5000} /> */}

        </section>
        <section className="mx-auto mt-4 pb-4 bg-gray-50">
          <div className="container mx-auto px-4 pt-4">
            <MissionAndVision/>
            <NewMemberAnnouncementBlock />
          </div>
        </section>
      </main>
      <FooterV3/>
    </div>
  );
};

export default HomePage;