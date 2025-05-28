import React from "react";
import StickyHeaderV2 from "../header/StickyHeaderV2";
import FooterV3 from "../FooterV3";
import AcademyDashboardV3 from "./AcademyDashboardV3";
import StickyHeaderV3 from "../header/StickyHeaderV3";

const AcademyPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <StickyHeaderV3/>
            <main className="flex-grow">
                {/* Event details page section */}
                <section className="container mx-auto px-4 pt-4">
                    <AcademyDashboardV3 />
                </section>
            </main>
            <FooterV3/>
        </div>
    )
}

export default AcademyPage;