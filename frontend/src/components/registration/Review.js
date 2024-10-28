import {Button, Col, Row} from "antd";
import React, {useContext, useEffect, useState} from "react";
import MultiStepFormContext from "./MultiStepFormContext";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import {loadStripe} from "@stripe/stripe-js";
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import StripeButton from "./StripeButton";
import Checkout from "../payment/Checkout";


const Review = () => {
    const {personalDetails, numberOfAttendee, next, prev} = useContext(MultiStepFormContext);
    const [ticketCost, setTicketCost] = useState(0)
    const numberOfAdult = numberOfAttendee.family_ticket ? 2 : numberOfAttendee.numberOfAdults;
    const numberOfChild = numberOfAttendee.family_ticket ? 3 : numberOfAttendee.numberOfChild;
    const ticketPrice = numberOfAttendee.family_ticket ? 50 : numberOfAdult * 20 + numberOfChild * 10;


    return (
        <div className={"details__wrapper"}>
            <Row>
                <Col span={24}>
                    <h4>Personal Details</h4>
                    <p>Full Name: {personalDetails.name}</p>
                    <p>Email: {personalDetails.email}</p>
                    <p>Phone: {personalDetails.phone}</p>
                </Col>
                <Col span={30}>
                    <h4>Total ticket cost</h4>
                    {numberOfAttendee.family_ticket &&
                        <p>{'Family Ticket( ' + numberOfAdult + ' Adult x 20 Eur + ' + numberOfChild + ' Children x 10 Eur ) = ' + ticketPrice + ' Eur'}</p>}
                    {!numberOfAttendee.family_ticket &&
                        <p>{numberOfAdult + ' Adult x 20 Eur + ' + numberOfChild + ' Children x 10 Eur  = ' + ticketPrice + ' Eur'}</p>}


                    <div
                        className={
                            "form__item button__items d-flex justify-content-between"
                        }
                    >
                        <Button type={"default"} onClick={prev}>
                            Back
                        </Button>
                        <Button type={"primary"} className="btn btn-primary" onClick={next}>
                            Confirm
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
export default Review;
