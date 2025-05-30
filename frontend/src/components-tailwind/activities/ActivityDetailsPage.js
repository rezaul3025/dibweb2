import React, {useEffect, useState} from "react";
import Activities from "./Activities";
import {useParams} from "react-router-dom";
import StickyHeaderV3 from "../header/StickyHeaderV3";
import FooterV3 from "../FooterV3";

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
            <StickyHeaderV3/>
            <main className="flex-grow pt-20">
                <section className="container mx-auto px-4">
                    {event && <Activities event={event}/>}
                </section>
            </main>
            <FooterV3 />
        </div>
    );
};

export default ActivityDetailsPage;