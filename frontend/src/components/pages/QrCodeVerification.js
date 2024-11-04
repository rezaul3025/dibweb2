import React, {Fragment, useEffect, useState} from "react";
import Navbar from "../nav/Navbar";
import {useParams} from "react-router-dom";
import Spinner from "../nav/Spinner";

export default function QrCodeVerification() {
    const {attendeeId} = useParams();
    const {paymentReference} = useParams();
    const [attendee, setAttendee] = useState(null);
    const [message, setMessage] = useState()
    const [checkingIn, setCheckingIn] = useState(false)

     useEffect(() => {
         let key= localStorage.getItem("cashSaleKey");
         if(!key) {
             key = prompt("Please enter the unlock key");
         }
         if(process.env.REACT_APP_CASH_SALE_KEY === key) {
             fetch('/api/v1/attendees/verify/' + attendeeId + '/' + paymentReference + '/')
                 .then(response => response.json())
                 .then(data => setAttendee(data));
             localStorage.setItem("cashSaleKey", process.env.REACT_APP_CASH_SALE_KEY);
         }
    }, []);

    function markAsCheckedIn(){
        setCheckingIn(true)
         fetch('/api/v1/mark-checked-in/' + attendeeId + '/' )
            .then(response => response.json())
            .then(data => {
                setMessage(data.message);
                setCheckingIn(false);
            }).catch(err =>{
                setCheckingIn(false);
         });
    }

    return (
        <Fragment>
            <div className="container-fluid position-relative p-0">
                <Navbar/>
                {/*<!-- Header Start -->*/}
                <div className="container-fluid bg-breadcrumb">
                    <div className="container text-center py-5" style={{maxWidth: '900px'}}>
                        <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">QR Code verification</h4>
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
                                    {attendee && !attendee.is_checked_in && <Fragment>
                                        <h4 className="text-primary"> Ticket Details</h4>
                                        <hr/>
                                        <p>Name: {attendee.name}</p>
                                        <p>Ticket : {attendee.ticket_info}</p>
                                        <h2 className="text-primary">{message} </h2>
                                        <button className="btn btn-primary" onClick={markAsCheckedIn}>{ checkingIn && <Spinner />} Mark as a checked in</button>
                                    </Fragment>}

                                     {attendee && attendee.is_checked_in &&<div>
                                         The attendee already checked in!
                                     </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};