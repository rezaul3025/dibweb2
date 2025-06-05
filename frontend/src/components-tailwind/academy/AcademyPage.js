import React from "react";
import AcademyDashboardV3 from "./AcademyDashboardV3";
import StickyHeaderV3 from "../header/StickyHeaderV3";
import FooterV3 from "../FooterV3";

const AcademyPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <StickyHeaderV3/>
            <main className="flex-grow pt-20">
                <section className="container mx-auto px-4">
                    <AcademyDashboardV3/>
                </section>
            </main>
            <FooterV3/>
        </div>
    )
}

export default AcademyPage;