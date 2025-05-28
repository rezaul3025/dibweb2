import React from "react";
import StickyHeaderV2 from "../header/StickyHeaderV2";
import FooterV3 from "../FooterV3";
import AboutUs from "./AboutUs";
import StickyHeaderV3 from "../header/StickyHeaderV3";

const AboutUsPage = () =>{
    return (
        <div className="min-h-screen flex flex-col">
            <StickyHeaderV3/>
            <main className="flex-grow">
                {/* Event details page section */}
                <section className="container mx-auto px-4 pt-4">
                     <AboutUs />
                </section>
            </main>
            <FooterV3/>
        </div>
    )
}

export default AboutUsPage;