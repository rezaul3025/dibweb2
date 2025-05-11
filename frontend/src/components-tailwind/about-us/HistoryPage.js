import React from "react";
import StickyHeader from "../header/StickyHeader";
import Activities from "../activities/Activities";
import FooterV3 from "../FooterV3";
import History from "./History";

const HistoryPage = () =>{
    return (
        <div className="min-h-screen flex flex-col">
            <StickyHeader/>
            <main className="flex-grow">
                {/* Event details page section */}
                <section className="container mx-auto px-4 pt-4">
                    <History />
                </section>
            </main>
            <FooterV3/>
        </div>
    )
}

export default HistoryPage;