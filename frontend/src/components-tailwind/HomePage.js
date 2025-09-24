import React, {Fragment} from "react";
import CarouselWithSidebarV2 from "./activities/CarouselWithSidebarV2";
import MissionAndVision from "./mission-and-vision/MissionAndVision";
import NewMemberAnnouncementBlock from "./NewMemberAnnouncementBlock";
import PrayerTimeCard from "./prayer-time/PrayerTimeCard";
import QuoteText from "./QuoteText";
import {useTranslation} from "react-i18next";
import StickyHeaderV3 from "./header/StickyHeaderV3";
import FooterV3 from "./FooterV3";


const HomePage = () => {
  const { t } = useTranslation();
  return (
      <div className="min-h-screen flex flex-col">
          <StickyHeaderV3/>
          <main className="flex-grow pt-20">
              <section className="container mx-auto px-4">
                  <div className="text-center">
                      <QuoteText
                          text={t('Home.heading')}
                          author={t('Home.sub_heading')}
                          size="sm"
                      />
                  </div>
              </section>
              {/* Hero Prayer Section */}
              <section className="container mx-auto px-4 pt-4">
                  <PrayerTimeCard/>
              </section>
              {/* Hero Carousel Section */}
              <section className="container mx-auto px-4 pt-4">
                  <CarouselWithSidebarV2/>
                  {/*<Carousel items={carouselItems} autoPlay={true} interval={5000} /> */}

              </section>
              <section className="mx-auto mt-4 pb-4 bg-gray-50">
                  <div className="container mx-auto px-4 pt-4">
                      <MissionAndVision/>
                      <NewMemberAnnouncementBlock/>
                  </div>
              </section>
          </main>
          <FooterV3 />
      </div>
          );
          };

          export default HomePage;