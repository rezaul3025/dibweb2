import React, {Fragment, useEffect, useState} from "react";
import Navbar from "../nav/Navbar";
import {useParams} from "react-router-dom";

export default function QrCodeVerification() {
    let {attendeeId} = useParams();
    const [attendee, setAttendee] = useState(null);

     useEffect(() => {
        fetch('/api/v1/attendees/' + attendeeId + '/')
            .then(response => response.json())
            .then(data => setAttendee(data));
    }, []);

    return (
        <Fragment>
            <div className="container-fluid position-relative p-0">
                <Navbar/>
                {/*<!-- Header Start -->*/}
                <div className="container-fluid bg-breadcrumb">
                    <div className="container text-center py-5" style={{maxWidth: '900px'}}>
                        <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">Prayer Time</h4>
                        <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown"
                            data-wow-delay="0.3s">
                            <li className="breadcrumb-item"><a href="/">QR Code verification</a></li>
                        </ol>
                    </div>
                </div>
                {/*<!-- Header End -->*/}
            </div>
            <div className="container-fluid about">
                <div className="container py-4">
                    <div className="row g-5 align-items-center">
                        <div className="mx-auto wow fadeInLeft" data-wow-delay="0.2s">
                            <h4 className="text-primary">QR Code verification</h4>
                            <div className="row g-4 py-2">
                                <div className="col-md-6 col-lg-12 wow fadeInUp" data-wow-delay="0.2s">
                                    {attendee && <Fragment>
                                        <h4 className="text-primary"> Ticket Details</h4>
                                        <hr/>
                                        <p>Name: {attendee.name}</p>
                                        <p>Ticket : {attendee.ticket_info}</p>
                                    </Fragment>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};