import React, {useEffect, useState} from "react";
import StickyHeader from "../header/StickyHeader";
import FooterV3 from "../FooterV3";
import Activities from "./Activities";
import {useParams} from "react-router-dom";

const ActivityDetailsPage = () => {
    const {eventId} = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch('/api/v1/events/' + eventId+'/')
            .then(response => response.json())
            .then(data => setEvent(data));
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <StickyHeader/>
            <main className="flex-grow">
                {/* Event details page section */}
                <section className="container mx-auto px-4 pt-4">
                    {event && <Activities event={event}/> }
                </section>
            </main>
            <FooterV3/>
        </div>
    );
};

export default ActivityDetailsPage;