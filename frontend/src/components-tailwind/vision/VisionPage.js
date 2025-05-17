import React from "react";
import StickyHeaderV2 from "../header/StickyHeaderV2";
import Donation from "../donation/Donation";
import FooterV3 from "../FooterV3";
import Vision from "./Vision";

const VisionPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <StickyHeaderV2/>
            <main className="flex-grow">
                {/* Event details page section */}
                <section className="container mx-auto px-4 pt-4">
                    <Vision />
                </section>
            </main>
            <FooterV3/>
        </div>
    )
}

export default VisionPage;