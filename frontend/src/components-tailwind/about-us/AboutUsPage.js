import React from "react";
import AboutUs from "./AboutUs";
import StickyHeaderV3 from "../header/StickyHeaderV3";
import FooterV3 from "../FooterV3";

const AboutUsPage = () =>{
    return (
        <div className="min-h-screen flex flex-col">
            <StickyHeaderV3/>
            <main className="flex-grow pt-20">
                <section className="container mx-auto px-4">
                    <AboutUs/>
                </section>
            </main>
            <FooterV3/>
        </div>
    )
}

export default AboutUsPage;