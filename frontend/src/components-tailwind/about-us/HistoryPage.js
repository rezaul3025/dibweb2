import React from "react";
import FooterV3 from "../FooterV3";
import StickyHeaderV2 from "../header/StickyHeaderV2";
import HistoryV2 from "./HistoryV2";

const HistoryPage = () =>{
    return (
        <div className="min-h-screen flex flex-col">
            <StickyHeaderV2/>
            <main className="flex-grow">
                {/* Event details page section */}
                <section className="container mx-auto px-4 pt-4">
                     <HistoryV2 />
                </section>
            </main>
            <FooterV3/>
        </div>
    )
}

export default HistoryPage;