import React from "react";
import StickyHeaderV2 from "../header/StickyHeaderV2";
import FooterV3 from "../FooterV3";
import Donation from "./Donation";
import StickyHeaderV3 from "../header/StickyHeaderV3";

const DonationPage = () =>{
    return (
        <div className="min-h-screen flex flex-col">
            <StickyHeaderV3/>
            <main className="flex-grow">
                {/* Event details page section */}
                <section className="container mx-auto px-4 pt-4">
                     <Donation />
                </section>
            </main>
            <FooterV3/>
        </div>
    )
}

export default DonationPage;