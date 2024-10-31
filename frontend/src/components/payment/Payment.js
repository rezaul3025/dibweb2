import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Checkout from "./Checkout";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";

export default function Payment(props) {
    const {payId} = useParams();
    const [attendee, setAttendee] = useState(null);
    const [sec, setSec] = useState(null);
    const initialOptions = {
        "client-id": process.env.REACT_APP_P_CLIENT_ID,
        currency: "EUR",
        intent: "capture",
    };

    useEffect(() => {
        fetch('/api/v1/attendees/' + payId + '/')
            .then(response => response.json())
            .then(data => setAttendee(data));
    }, []);

    return (
        <Fragment>
            <div className="container-fluid feature pb-5 py-5">
                <div id="donation" className="container pb-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s">
                        <h4 className="text-primary">{props.paymentType} Payment</h4>
                        <p className="mb-0">{props.message}</p>
                    </div>
                    <div className="rounded h-100 wow fadeInUp" data-wow-delay="0.2s">
                        <div className="row g-4">
                            <div className="col-md-12 col-lg-12 col-xl-6 wow fadeInUp" data-wow-delay="0.2s">
                                {attendee &&  <h5 className="text-dark">Payment due <i
                                    className="fas fa-solid fa-euro-sign text-primary"> {attendee.price?attendee.price:props.amount}</i>
                                </h5>}
                            </div>
                            <div className="col-md-12 col-lg-12 col-xl-6 wow fadeInUp" data-wow-delay="0.2s">
                                {attendee &&
                                    <PayPalScriptProvider options={initialOptions}>
                                        <Checkout amount={attendee.price?attendee.price:props.amount} attendee_id={attendee.id} event_id={attendee.event}/>
                                    </PayPalScriptProvider>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};